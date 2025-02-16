import os
import requests
import pickle
import json
from bs4 import BeautifulSoup
import re
import time
import uuid
import logging
from typing import Dict, List, Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)

def load_cookies(cookies_file: str, session: requests.Session) -> bool:
    if os.path.exists(cookies_file):
        with open(cookies_file, 'rb') as file:
            cookies = pickle.load(file)
            session.cookies.update(cookies)
        try:
            response = session.get("https://aisis.ateneo.edu/j_aisis/J_VOFC.do")
            return response.ok and "CURRICULUM OFFERINGS" in response.text
        except requests.RequestException:
            return False
    return False

def save_cookies(cookies_file: str, session: requests.Session):
    with open(cookies_file, 'wb') as file:
        pickle.dump(session.cookies, file)

def login(session: requests.Session, username: str, password: str) -> bool:
    login_url = "https://aisis.ateneo.edu/j_aisis/login.do"
    form_data = {
        "userName": username,
        "password": password,
        "submit": "Sign in",
        "command": "login",
        "rnd": f"r{''.join(['%02x' % i for i in bytearray(os.urandom(10))])}"
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        response = session.post(login_url, data=form_data, headers=headers)
        return response.ok and "User Identified As" in response.text
    except requests.RequestException:
        return False

def get_degree_codes(session: requests.Session) -> List[Dict[str, str]]:
    try:
        response = session.get("https://aisis.ateneo.edu/j_aisis/J_VOFC.do")
        if not response.ok:
            raise Exception(f"Failed to fetch degree codes: {response.status_code}")

        soup = BeautifulSoup(response.text, 'html.parser')
        select = soup.find('select', {'name': 'degCode'})
        
        if not select:
            raise Exception("Degree code select element not found")

        return [
            {'code': option.get('value'), 'name': option.text.strip()}
            for option in select.find_all('option')
            if option.get('value')
        ]

    except Exception as e:
        logging.error(f"Error fetching degree codes: {e}")
        return []

def get_curriculum(session: requests.Session, degree_code: str, degree_name: str) -> Dict:
    url = "https://aisis.ateneo.edu/j_aisis/J_VOFC.do"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    try:
        response = session.post(url, data={"degCode": degree_code}, headers=headers)
        if not response.ok:
            raise Exception(f"Failed to fetch curriculum: {response.status_code}")
        
        return parse_curriculum(response.text, degree_code, degree_name)

    except Exception as e:
        logging.error(f"Error fetching curriculum for {degree_code}: {e}")
        return None

def calculate_semester_units(courses: List[Dict]) -> float:
    total = 0.0
    for course in courses:
        try:
            units = float(course['units'])
            total += units
        except (ValueError, KeyError):
            continue
    return total

def parse_curriculum(html_content: str, degree_code: str, degree_name: str) -> Dict:
    soup = BeautifulSoup(html_content, 'html.parser')
    years = []
    current_year = []
    current_courses = []
    
    for row in soup.find_all('tr'):
        try:
            # New year starts
            if row.find('td', class_='text06'):
                if current_year:
                    if current_courses:
                        semester_units = calculate_semester_units(current_courses)
                        if semester_units > 0:
                            current_year.append(semester_units)
                        current_courses = []
                    years.append(current_year)
                current_year = []
                continue
            
            # Semester section
            semester_cell = row.find('td', class_='text04', colspan='5')
            if semester_cell:
                if current_courses:
                    semester_units = calculate_semester_units(current_courses)
                    if semester_units > 0:
                        current_year.append(semester_units)
                    current_courses = []
                continue
            
            # Course row
            cells = row.find_all('td', class_='text02')
            if len(cells) >= 5:
                course = {
                    'catNo': cells[0].text.strip(),
                    'units': cells[2].text.strip()
                }
                current_courses.append(course)
                continue
        except Exception as e:
            logging.error(f"Error parsing row in {degree_code}: {str(e)}")
            continue
    
    # Add the last year if it has data
    if current_courses:
        semester_units = calculate_semester_units(current_courses)
        if semester_units > 0:
            current_year.append(semester_units)
    if current_year:
        years.append(current_year)
    
    # Only return years that have semesters with units
    years = [year for year in years if year]
    
    return {
        degree_code: {
            'name': degree_name,
            'years': years
        }
    }

def generate_course_codes_js(degree_codes: List[Dict[str, str]], output_path: str):
    # Generate courses object
    courses = {
        degree['code']: degree['name']
        for degree in degree_codes
    }
    
    # Generate labels array
    labels = [
        {
            'label': degree['name'],
            'id': i
        }
        for i, degree in enumerate(degree_codes)
    ]
    
    # Generate course_codes array
    course_codes = [degree['code'] for degree in degree_codes]
    
    # Create the JavaScript content
    js_content = f"""export const courses = {json.dumps(courses, indent=4)};

export const labels = {json.dumps(labels, indent=4)};

export const course_codes = {json.dumps(course_codes, indent=4)};
"""
    
    # Write to file
    with open(output_path, 'w') as f:
        f.write(js_content)

def main():
    session = requests.Session()
    cookies_file = 'cookies.pkl'
    output_dir = os.path.join(os.getcwd(), 'curriculum_data')
    os.makedirs(output_dir, exist_ok=True)

    # Login or load session
    is_logged_in = load_cookies(cookies_file, session)
    if not is_logged_in:
        username = os.getenv("AISIS_USERNAME")
        password = os.getenv("AISIS_PASSWORD")
        if not username or not password:
            logging.error("AISIS credentials not found in environment variables")
            return
        if not login(session, username, password):
            logging.error("Login failed")
            return
        save_cookies(cookies_file, session)

    # Get degree codes
    degree_codes = get_degree_codes(session)
    logging.info(f"Found {len(degree_codes)} degree programs")
    
    # Save degree codes
    with open(os.path.join(output_dir, 'degree_codes.json'), 'w') as f:
        json.dump(degree_codes, f, indent=2)

    # Generate course_codes.js
    generate_course_codes_js(
        degree_codes, 
        os.path.join(output_dir, 'course_codes.js')
    )

    # Fetch first 5 curricula
    all_curricula = {}
    for degree in degree_codes:
        try:
            logging.info(f"Fetching curriculum for {degree['code']}")
            curriculum = get_curriculum(session, degree['code'], degree['name'])
            if curriculum:
                all_curricula.update(curriculum)
            time.sleep(1)
        except Exception as e:
            logging.error(f"Error processing {degree['code']}: {e}")

    # Generate the JavaScript export format
    js_output = "export const aisis_data = " + json.dumps(all_curricula, indent=4) + ";"
    
    # Save as JavaScript file
    with open(os.path.join(output_dir, 'curricula.js'), 'w') as f:
        f.write(js_output)

    logging.info("Curriculum data collection complete")

if __name__ == "__main__":
    main()