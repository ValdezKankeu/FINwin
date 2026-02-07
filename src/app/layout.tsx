import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'FINwin',
  description: 'Turn Saving Into a Game You Can Win',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-black">
        <Toaster position="top-center" richColors theme="dark" />
        {children}
      </body>
    </html>
  );
}
