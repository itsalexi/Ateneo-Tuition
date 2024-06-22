import { peso } from '@/helpers/helpers';
import { Table } from '@mui/joy';
import React from 'react';
import { useSelector } from 'react-redux';

const TuitionForecast = () => {
    let tuitionForecast = {};
    const { tuitionIncrease, tuitionPerUnit } = useSelector(
        (state) => state.years
    );

    for (let i = 1; i <= 5; i++) {
        let currentYear = new Date().getFullYear();
        const year = currentYear + i - 1;
        tuitionForecast[year] =
            tuitionPerUnit * (1 + tuitionIncrease) ** (i - 1);
    }

    console.log(tuitionForecast);
    return (
        <fieldset className="field">
            <legend>Forecasted Tuition</legend>
            <Table variant="outlined" className="year-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Cost Per Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(tuitionForecast).map((key) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{peso.format(tuitionForecast[key])}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </fieldset>
    );
};

export default TuitionForecast;
