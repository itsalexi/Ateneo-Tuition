'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/joy/Table';
import { stringifyNumber, peso } from '@/helpers/helpers';

export const YearViewer = ({ id }) => {
    const year = useSelector((state) => state.years.years).find(
        (year) => year.id === id
    );

    const { tuitionIncrease, tuitionPerUnit } = useSelector(
        (state) => state.years
    );

    if (year.length === 2) {
        year.unshift(0);
    }

    return (
        <Table variant="outlined" className="year-table">
            <thead>
                <tr>
                    <th>{stringifyNumber(id + 1)} Year</th>
                    <th>Units</th>
                    <th>Semester Payment</th>
                </tr>
            </thead>
            <tbody>
                {year.semesters.map((semester, index) => (
                    <tr key={index}>
                        <td>
                            {index === 0
                                ? 'Intersession'
                                : index === 1
                                ? 'First Semester'
                                : 'Second Semester'}
                        </td>
                        <td>{semester}</td>
                        <td>
                            {peso.format(
                                semester *
                                    (tuitionPerUnit *
                                        (1 + (tuitionIncrease / 100)) ** id)
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>
                        {year.semesters.reduce(
                            (total, current) =>
                                parseInt(total) + parseInt(current),
                            0
                        )}
                    </td>
                    <td>
                        {peso.format(
                            year.semesters.reduce(
                                (total, current) =>
                                    parseInt(total) + parseInt(current),
                                0
                            ) *
                                (tuitionPerUnit * (1 + (tuitionIncrease / 100)) ** id)
                        )}
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
};
