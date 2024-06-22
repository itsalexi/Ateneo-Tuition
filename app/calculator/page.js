'use client';

import { Provider, useSelector } from 'react-redux';
import { YearEditor } from '@/components/YearEditor';
import '@fontsource/inter';
import { YearViewer } from '@/components/YearViewer';
import OtherInformation from '@/components/OtherInformation';
import TuitionForecast from '@/components/TuitionForecast';
import Header from '@/components/Header';
import Credits from '@/components/Credits';
import store from '@/redux/store';

export default function Calculator() {
    const years = useSelector((state) => state.years.years);

    return (
        <Provider store={store}>
            <Header></Header>

            <main className="main">
                <div className="main-row">
                    <div className="main-left">
                        <div className="main-field">
                            <OtherInformation />
                        </div>
                        <div className="main-field">
                            <TuitionForecast />
                        </div>
                        <div className="main-field">
                            <Credits />
                        </div>
                    </div>
                    <div className="main-right">
                        {years.map((year) => (
                            <div className="year-row" key={year.id}>
                                <div className="editor">
                                    <YearEditor id={year.id} />
                                </div>
                                <div className="viewer">
                                    <YearViewer id={year.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Provider>
    );
}
