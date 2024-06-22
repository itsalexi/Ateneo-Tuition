const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    selectedCourse: {},
    fifthYear: false,
    tuitionIncrease: 0.06,
    tuitionPerUnit: 5221.3,
    years: [
        {
            id: 0,
            semesters: [0, 0, 0],
            intersession: false,
        },
        {
            id: 1,
            semesters: [0, 0, 0],
            intersession: false,
        },
        {
            id: 2,
            semesters: [0, 0, 0],
            intersession: false,
        },
        {
            id: 3,
            semesters: [0, 0, 0],
            intersession: false,
        },
    ],
};

const yearsSlice = createSlice({
    name: 'years',
    initialState,
    reducers: {
        addYear: (state, action) => {
            state.years.push({
                id: action.payload.id,
                semesters: [0, 0, 0],
                intersession: false,
            });
        },
        removeYear: (state, action) => {
            state.years = state.years.filter(
                (year) => year.id !== action.payload.id
            );
        },
        updateBasicFees: (state, action) => {
            state.basicFees = action.payload.value;
        },
        updateSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload.value;
        },
        updateMiscFees: (state, action) => {
            state.miscFees = action.payload.value;
        },
        updateTuitionPerUnit: (state, action) => {
            state.tuitionPerUnit = action.payload.value;
        },
        updateTuitionIncrease: (state, action) => {
            // value received will be between 1 to 100, convert to percentage
            const newValue = action.payload.value / 100;
            state.tuitionIncrease = newValue;
        },

        updateFirstSemester: (state, action) => {
            const { id, newUnits } = action.payload;
            const year = state.years.find((year) => year.id === id);
            year.semesters[1] = newUnits;
        },
        updateSecondSemester: (state, action) => {
            const { id, newUnits } = action.payload;
            const year = state.years.find((year) => year.id === id);
            year.semesters[2] = newUnits;
        },
        updateIntersessionSemester: (state, action) => {
            const { id, newUnits } = action.payload;
            const year = state.years.find((year) => year.id === id);
            year.semesters[0] = newUnits;
        },
        updateIntersession: (state, action) => {
            const { id } = action.payload;
            const year = state.years.find((year) => year.id === id);
            year.intersession = !year.intersession;
        },
        toggleFifthYear: (state) => {
            if (!state.fifthYear) {
                state.fifthYear = true;
                state.years.push({
                    id: 4,
                    semesters: [0, 0, 0],
                    intersession: false,
                });
            } else {
                state.fifthYear = false;
                state.years.pop();
            }
        },
    },
});

export const {
    addYear,
    updateFirstSemester,
    updateSecondSemester,
    updateIntersessionSemester,
    updateIntersession,
    removeYear,
    toggleFifthYear,
    updateBasicFees,
    updateMiscFees,
    updateTuitionPerUnit,
    updateSelectedCourse,
    updateTuitionIncrease,
} = yearsSlice.actions;
export default yearsSlice.reducer;
