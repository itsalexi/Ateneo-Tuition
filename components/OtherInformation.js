import {
    toggleFifthYear,
    updateBasicFees,
    updateMiscFees,
    updateTuitionIncrease,
    updateTuitionPerUnit,
} from '@/redux/yearsSlice';
import { Checkbox, Input } from '@mui/joy';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OtherInformation = () => {
    const { fifthRow, basicFees, miscFees, tuitionIncrease, tuitionPerUnit } =
        useSelector((state) => state.years);
    const dispatch = useDispatch();

    const onToggleFifthRow = () => {
        dispatch(toggleFifthYear());
    };

    const onTuitionPerUnitChange = (e) => {
        dispatch(updateTuitionPerUnit({ value: e.target.value }));
    };

    const onTuitionIncreaseChange = (e) => {
        dispatch(updateTuitionIncrease({ value: e.target.value }));
    };

    return (
        <fieldset className="field otherfield">
            <legend className="legend">Other Information</legend>
            <div className="other-info">
                <div className="fifth-year-check">
                    <label>Is there a fifth year for this course?</label>
                    <Checkbox
                        type="checkbox"
                        onChange={onToggleFifthRow}
                        checked={fifthRow}
                    />
                </div>
                <label>Tuition Per Unit</label>
                <Input
                    onChange={onTuitionPerUnitChange}
                    value={tuitionPerUnit}
                    type="number"
                />
                <label>Tuition Increase Per Year (%)</label>
                <Input
                    onChange={onTuitionIncreaseChange}
                    value={tuitionIncrease * 100}
                    type="number"
                />
                <p className="disclaimer">
                    Default values are updated as of June 2024
                </p>
            </div>
        </fieldset>
    );
};

export default OtherInformation;
