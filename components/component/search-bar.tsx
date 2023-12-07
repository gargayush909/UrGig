'use server'
import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import SearchBarClient from './search-bar-client'

export default async function SearchBar() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  return (
    <SearchBarClient session={session}></SearchBarClient>
  )
}
