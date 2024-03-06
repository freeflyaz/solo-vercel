// app/layout.tsx
import { fonts } from './fonts';
import { Providers } from './providers';
import './globals.css';

import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Einbürgerungstest - Leben in Deutschland Test App',
  description: `Willkommen bei Einbürgerungstest Online – Meistern Sie den 'Leben in Deutschland' Test in Ihrer eigenen Sprache! Beginnen Sie heute Ihre kostenlose Reise und finden Sie heraus, ob Sie bereit sind, mühelos zu bestehen.`,
  verification: {
    google: 'jqSf0MVN1UpmPF9H5sf4lnaOLL0Nj-dvCbf_lgbSH4o'
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
