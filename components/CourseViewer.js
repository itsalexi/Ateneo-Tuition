'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/joy/Table';
import { stringifyNumber, peso } from '@/helpers/helpers';

export const CourseViewer = ({ year, id }) => {

  const { tuitionIncrease, tuitionPerUnit, currentYear } = useSelector(
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
          <th>{stringifyNumber(id + 1 + currentYear)} Year</th>
          <th>
            Units (
            {peso.format(
              (tuitionPerUnit * (1 + tuitionIncrease / 100) ** id).toFixed(2)
            )}{' '}
            per)
          </th>
          <th>Semester Payment</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((semester, index) => (
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
                semester * (tuitionPerUnit * (1 + tuitionIncrease / 100) ** id)
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            {data?.reduce(
              (total, current) => parseInt(total) + parseInt(current),
              0
            )}
          </td>
          <td>
            {peso.format(
              data?.reduce(
                (total, current) => parseInt(total) + parseInt(current),
                0
              ) *
                (tuitionPerUnit * (1 + tuitionIncrease / 100) ** id)
            )}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};
