'use client';

import store from '@/redux/store';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider store={store}>{children}</Provider>
            </body>
        </html>
    );
}
