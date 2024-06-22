import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Ateneo Tuition Fee Viewer',
    description:
        'Easily estimate and see how much your tuition will cost at Ateneo with this very intuitive and user friendly web-app.',
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
