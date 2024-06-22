'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/joy/Table';
import { stringifyNumber, peso } from '@/helpers/helpers';
export const CourseViewer = ({ year, id }) => {
    const { tuitionIncrease, tuitionPerUnit } = useSelector(
        (state) => state.years
    );
    let data = [...year];
    if (year.length === 2) {
        data.unshift(0);
    }
    if (year.length === 1) {
        data = [0, ...year, 0];
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
                    {data?.map((semester, index) => (
                        <td key={index + 1}>{semester}</td>
                    ))}
                    <td>
                        {data?.reduce(
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
                    {data?.map((semester, index) => (
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
                            data?.reduce(
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
