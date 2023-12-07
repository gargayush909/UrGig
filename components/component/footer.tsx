import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-2 py-6 w-full shrink-0 px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2023 UrGig. All rights reserved.</p>
        {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">Made with 💜 by Team Brainchant.</p> */}
    </footer>
  )
}
