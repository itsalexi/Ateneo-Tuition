'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateIntersession } from '@/redux/yearsSlice';
import { stringifyNumber } from '@/helpers/helpers';

export const Year = ({ id }) => {
    const year = useSelector((state) => state.years.years).find(
        (year) => year.id === id
    );

    const [intersession, setIntersession] = useState(year?.intersession);
    const dispatch = useDispatch();

    const toggleIntersession = () => {
        setIntersession(!year.intersession);
        dispatch(updateIntersession({ id }));
    };

    return (
        <fieldset className="year">
            <legend>{stringifyNumber(id + 1)} Year Subjects</legend>
            <label>First Semester Units</label>
            <input type="number" id="" />
            <label>Second Semester Units</label>
            <input type="number" id="" />
            <div>
                <label>Do you have intersession/summer?</label>
                <input
                    type="checkbox"
                    onChange={toggleIntersession}
                    checked={intersession}
                />
            </div>
            {intersession ? (
                <>
                    <label>Intersession Units</label>
                    <input type="number" />
                </>
            ) : (
                ''
            )}
        </fieldset>
    );
};
