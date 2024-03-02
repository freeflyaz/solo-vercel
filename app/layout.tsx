// app/layout.tsx
import { fonts } from './fonts';
import { Providers } from './providers';
import './globals.css';

import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Einbürgerungstest',
  description: 'Einbürgerungstest',
  verification: {
    google: 'ZvLMEPPGmHtSCxGLhPkpWoL4Gc7yVyg6pKwr35crXWM'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
