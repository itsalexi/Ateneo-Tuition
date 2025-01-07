import React, { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import { labels, course_codes } from '@/data/course_codes';
import { aisis_data } from '@/data/data';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentYear, updateSelectedCourse } from '@/redux/yearsSlice';

const CourseSelector = () => {
  const dispatch = useDispatch();
  const { selectedCourse, currentYear } = useSelector((state) => state.years);
  const handleCourseChange = (event, newValue) => {
    dispatch(
      updateSelectedCourse({
        value: aisis_data[course_codes[newValue?.id]],
      })
    );
    dispatch(updateCurrentYear({ value: 0 }));
  };

  return (
    <fieldset className="field">
      <legend>Choose Course</legend>
      <label>Course Name</label>
      <Autocomplete onChange={handleCourseChange} options={labels} />
      {selectedCourse?.years && (
        <>
          <label>Current Year</label>
          <Autocomplete
            options={selectedCourse.years.map((year, index) => ({
              label: `Year ${index + 1}`,
              id: index,
            }))}
            onChange={(event, newValue) => {
              if (newValue) {
                dispatch(updateCurrentYear({ value: newValue.id }));
              }
            }}
            value={{
              label: `Year ${currentYear + 1}`,
              id: currentYear,
            }}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </>
      )}
    </fieldset>
  );
};

export default CourseSelector;
