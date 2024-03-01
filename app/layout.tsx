// app/layout.tsx
import { fonts } from './fonts'
import { Providers } from './providers'
import "./globals.css";

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
  verification: {
    google: "ZvLMEPPGmHtSCxGLhPkpWoL4Gc7yVyg6pKwr35crXWM",
  },
}

{/* <meta name="google-site-verification" content="ZvLMEPPGmHtSCxGLhPkpWoL4Gc7yVyg6pKwr35crXWM" /> */}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}