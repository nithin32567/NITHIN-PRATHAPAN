import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GsapProvider } from './context/gsapContext'
// import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import SmoothScroll from './components/layout/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio Website',
  icons: {
    icon: '/favicon-bw.png',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <GsapProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
            {/* <Footer /> */}
          </SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  )
}
