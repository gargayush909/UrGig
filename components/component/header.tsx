'use server'
import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import HeaderClient from './header-client'

export default async function Header() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  return (
    <HeaderClient session={session}></HeaderClient>
  )
}
