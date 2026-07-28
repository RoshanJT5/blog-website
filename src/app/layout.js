import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Wander & Wayfare — Travel & Lifestyle Blog',
  description: 'Stories, guides and honest advice for people who’d rather be somewhere else.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.className}>
      <body>{children}</body>
    </html>
  );
}
