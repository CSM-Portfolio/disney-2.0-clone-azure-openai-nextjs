import type { Metadata } from 'next'

import './globals.css'

import Header from '@/components/Header'
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: 'Disney+ Clone 2.0 with AI',
  description: 'Disney+ Clone with AI features',
}

export default function RootLayout ( {
  children,
}: {
  children: React.ReactNode
} )
{
  return (
    <html lang="en">
      <body className="dark:bg-[#1A1C29] bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          { children }
        </ThemeProvider>
      </body>
    </html>
  )
}
