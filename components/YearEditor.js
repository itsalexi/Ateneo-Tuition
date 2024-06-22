'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeYear,
    updateFirstSemester,
    updateIntersession,
    updateIntersessionSemester,
    updateSecondSemester,
} from '@/redux/yearsSlice';
import { stringifyNumber } from '@/helpers/helpers';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';

export const YearEditor = ({ id }) => {
    const year = useSelector((state) => state.years.years).find(
        (year) => year.id === id
    );

    const [intersession, setIntersession] = useState(year?.intersession);
    const dispatch = useDispatch();

    const toggleIntersession = () => {
        setIntersession(!year.intersession);
        dispatch(updateIntersession({ id }));
    };

    const firstSemesterChange = (e) => {
        dispatch(updateFirstSemester({ id, newUnits: e.target.value }));
    };

    const secondSemesterChange = (e) => {
        dispatch(updateSecondSemester({ id, newUnits: e.target.value }));
    };

    const intersessionChange = (e) => {
        dispatch(updateIntersessionSemester({ id, newUnits: e.target.value }));
    };
    return (
        <fieldset className="field">
            <legend className="year-level-legend">
                {stringifyNumber(id + 1)} Year
            </legend>
            <label>First Semester Units</label>
            <Input onChange={firstSemesterChange} type="number" id="" />
            <label>Second Semester Units</label>
            <Input onChange={secondSemesterChange} type="number" id="" />
            <div className="intersession-check">
                <label>Do you have intersession/summer?</label>
                <Checkbox
                    type="checkbox"
                    onChange={toggleIntersession}
                    checked={intersession}
                />
            </div>
            {intersession ? (
                <>
                    <label>Intersession Units</label>
                    <Input onChange={intersessionChange} type="number" />
                </>
            ) : (
                ''
            )}
        </fieldset>
    );
};
