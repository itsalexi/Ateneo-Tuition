const { configureStore } = require('@reduxjs/toolkit');

import yearsReducer from './yearsSlice';

const store = configureStore({
    reducer: {
        years: yearsReducer,
    },
});

export default store;
