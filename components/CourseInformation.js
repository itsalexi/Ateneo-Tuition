import { Input } from '@mui/joy';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseViewer } from './CourseViewer';

const CourseInformation = () => {
    const { selectedCourse, currentYear } = useSelector((state) => state.years);
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
            <p className="disclaimer">
                These values are only estimated and not the exact values that
                you will see in your statement of account. This also does not
                include the other fees such as: basic, laboratory, and
                miscellaneous fees.
            </p>
            <fieldset className="field">
                <legend>Unit Information</legend>
                {years?.slice(currentYear).map((year, index) => (
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
