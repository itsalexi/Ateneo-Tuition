import React, { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import { labels, course_codes } from '@/data/course_codes';
import { aisis_data } from '@/data/data';
import { useDispatch } from 'react-redux';
import { updateSelectedCourse } from '@/redux/yearsSlice';

const CourseSelector = () => {
    const dispatch = useDispatch();

    const handleCourseChange = (event, newValue) => {
        dispatch(
            updateSelectedCourse({
                value: aisis_data[course_codes[newValue?.id]],
            })
        );
    };

    return (
        <fieldset className="field">
            <legend>Choose Course</legend>
            <Autocomplete onChange={handleCourseChange} options={labels} />
        </fieldset>
    );
};

export default CourseSelector;
