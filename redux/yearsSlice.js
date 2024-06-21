const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    years: [
        {
            id: 0,
            semesters: [],
            intersession: true,
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
                semesters: [],
                intersession: false,
            });
        },
        updateYear: (state, action) => {
            const { index, newValue } = action.payload;
            if (state.years[index]) {
                state.years[index] = newValue;
            }
        },
        updateIntersession: (state, action) => {
            const { id } = action.payload;
            const year = state.years.find((year) => year.id === id);
            if (year) {
                year.intersession = !year.intersession;
            }
        },
    },
});

export const { addYear, updateYear, updateIntersession } = yearsSlice.actions;
export default yearsSlice.reducer;
