import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Footer from '@/components/component/footer'
import Header from '@/components/component/header'
import ChatWithUs from '@/components/component/chat-with-us'

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
      <head>
        <script
          async
          data-id="2868886574"
          id="chatling-embed-script"
          type="text/javascript"
          src="https://chatling.ai/js/embed.js"
        ></script>
      </head>
      <body
        className={cn(
          'min-h-screen antialiased bg-background text-foreground',
          outfit.className
        )}
      >
        <Header></Header>
        {children}
        {/* <ChatWithUs className='fixed bottom-0 right-0 z-50 w-[300px] h-[400px] bg-background/80 backdrop-blur-xl'></ChatWithUs> */}
        <Footer></Footer>
      </body>
    </html>
  )
}
