'use client';

import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Year } from '@/components/Year';
import { addYear } from '@/redux/yearsSlice';

export default function Home() {
    const years = useSelector((state) => state.years.years);
    const dispatch = useDispatch();

    const handleAddYear = () => {
        dispatch(addYear({ id: years.length }));
    };

    return (
        <main className={styles.main}>
            <button onClick={handleAddYear}>Add Year +</button>
            {years.map((year) => (
                <Year key={year.id} id={year.id} />
            ))}
        </main>
    );
}
