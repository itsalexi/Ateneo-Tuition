'use client';
import Header from '@/components/Header';
import './globals.css';
import OtherInformation from '@/components/OtherInformation';
import CourseInformation from '@/components/CourseInformation';
import TuitionForecast from '@/components/TuitionForecast';
import CourseSelector from '@/components/CourseSelector';
import Credits from '@/components/Credits';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function Home() {
    return (
        <Provider store={store}>
            <Header></Header>
            <main className="main">
                <div className="main-row">
                    <div className="main-left">
                        <OtherInformation disableCheck={true} />
                        <CourseSelector />
                        <TuitionForecast />
                        <Credits />
                    </div>
                    <div className="main-right">
                        <CourseInformation />
                    </div>
                </div>
            </main>
        </Provider>
    );
}
