import { Input } from '@mui/joy';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseViewer } from './CourseViewer';

const CourseInformation = () => {
    const { selectedCourse } = useSelector((state) => state.years);
    const string = selectedCourse?.name;
    const years = selectedCourse?.years;
    let match = string?.match(/\((.*?)\)\s*(.*?)\s*\(/);
    let courseCode = match ? match[1] : null;
    let courseName = match ? match[2] : null;

    return (
        <>
            <fieldset className="field">
                <legend>Course Information</legend>
                <label>Course Code</label>
                <Input readOnly value={courseCode}></Input>
                <label>Course Name</label>
                <Input readOnly value={courseName}></Input>
            </fieldset>
            <fieldset className="field">
                <legend>Unit Information</legend>
                {years?.map((year, index) => (
                    <div className="year-row" key={index}>
                        <div className="viewer">
                            <CourseViewer year={year} id={index} />
                        </div>
                    </div>
                ))}
            </fieldset>
        </>
    );
};

export default CourseInformation;
