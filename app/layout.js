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
            <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "2757a908e68149b5975175c340810940"}'></script><!-- End Cloudflare Web Analytics -->
            <body className={inter.className}>{children}</body>
        </html>
    );
}
