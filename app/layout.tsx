import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Footer from '@/components/component/footer'
import Header from '@/components/component/header'

const outfit = Raleway({ variable: '--font-outfit', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UrGig',
  description: "UrGig's official website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen antialiased bg-background text-foreground',
          outfit.className
        )}
      >
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
