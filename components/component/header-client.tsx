'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BrainchantLogoPNG from '@/public/logo_cropped.png'
import { Button } from '@/components/ui/button'
import type { Session } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UrGigLogo } from './UrGigLogo'

export default function HeaderClient({ session }: { session: Session | null }) {
  const user = session?.user
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-xl">
      <div className="px-8 lg:px-12 h-16 py-2 flex items-center">
        <div className="flex gap-16 items-center">
          <Link
            className="flex items-center justify-center text-2xl font-[700]"
            href="/"
          >
            <UrGigLogo></UrGigLogo>
          </Link>
          <div className="hidden gap-8 lg:flex">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/projects"
            >
              All Projects
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/add-project"
            >
              Add Project
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/contact-us"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <nav className="ml-auto flex justify-center items-center gap-6 sm:gap-6">
          {user ? (
            <Link className="text-sm font-medium " href="/account">
              <div className="flex">
                <Button
                  variant={'link'}
                  className="text-foreground hover:underline underline-offset-4"
                >
                  {user?.user_metadata.full_name}
                </Button>
                <Avatar className="select-none">
                  <AvatarImage
                    draggable="false"
                    src={user?.user_metadata.avatar_url}
                    alt={user?.user_metadata.full_name}
                    className="dark:invert"
                  />
                  <AvatarFallback>
                    {user?.user_metadata.fullname === undefined
                      ? user?.user_metadata.full_name
                          .toString()
                          .split(' ')
                          .map((word: string) => word[0].toUpperCase())
                          .join('')
                      : user?.email}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/signin"
              >
                <Button
                  variant={'outline'}
                  className="hover:bg-primary px-5 bg-background/0 hover:text-background"
                >
                  Sign In
                </Button>
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/signup"
              >
                <Button
                  variant={'outline'}
                  className="hover:bg-primary px-5 bg-background/0 hover:text-background"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
