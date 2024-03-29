import type { Metadata } from 'next'
import {  Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/component/header'
import Footer from '@/component/footer'
import { Providers } from '../redux/provider';

const poppins =  Poppins({weight:'400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'M&B Fashion',
  description: 'Created by Ali Abbas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
    <html lang="en">
      <body className={poppins.className}>
       <Header />
        {children}
        <Footer />
        </body>
    </html>
    </Providers>
  )
}
