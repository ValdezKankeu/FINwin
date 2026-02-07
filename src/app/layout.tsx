import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const font = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'FINwin — Play Your Life',
  description: 'Your money is already shaping your future. Want to see how?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-white text-gray-900 antialiased`}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
