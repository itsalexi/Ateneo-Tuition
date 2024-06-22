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
                    <th>Intersession</th>
                    <th>First</th>
                    <th>Second</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Units (
                        {peso.format(
                            tuitionPerUnit * (1 + tuitionIncrease) ** id
                        )}{' '}
                        per)
                    </td>
                    {year.semesters.map((semester, index) => (
                        <td key={index + 1}>{semester}</td>
                    ))}
                    <td>
                        {year.semesters.reduce(
                            (total, current) =>
                                parseInt(total) + parseInt(current),
                            0
                        )}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Payment / Semester</td>
                    {year.semesters.map((semester, index) => (
                        <td key={index + 1}>
                            {peso.format(
                                semester *
                                    (tuitionPerUnit *
                                        (1 + tuitionIncrease) ** id)
                            )}
                        </td>
                    ))}
                    <td>
                        {peso.format(
                            year.semesters.reduce(
                                (total, current) =>
                                    parseInt(total) + parseInt(current),
                                0
                            ) *
                                (tuitionPerUnit * (1 + tuitionIncrease) ** id)
                        )}
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
};
