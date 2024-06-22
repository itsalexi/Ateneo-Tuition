'use client';
import { Provider } from 'react-redux';
import Calculator from './calculator';
import store from '@/redux/store';

export default function CalculatorPage() {
    return (
        <Provider store={store}>
            <Calculator />
        </Provider>
    );
}
