'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import type { PostgrestError } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Tables } from '@/types/supabase'
import { CiLocationOn, CiCalendarDate, CiMoneyBill } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ClockIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'

export default function AccountForm(
  { session, userProfile, userProjects, applicationsData } : 
  {
    session: Session | null,
    userProfile: any,
    userProjects: any[],
    applicationsData: any[]
  }
  ) {
  const user = session?.user
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState<string>(userProfile.full_name)
  const [username, setUsername] = useState<string>(userProfile.username)
  const [website, setWebsite] = useState<string>(userProfile.website)

  async function updateProfile({
    username,
    fullname,
    website
  }: {
    username: string | null
    fullname: string | null
    website: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error : any) {
      alert(`Error updating the data...\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-start min-w-screen lg:px-8 px-0 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16'>
      {!user?.user_metadata.buyer ?
      
      <div className="flex justify-center items-center flex-col lg:w-[650px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
         
        <h1 className="text-3xl font-[800] pb-4"><span className='text-primary'>Projects</span> Listed</h1>
        {userProjects.length === 0 ? null : userProjects.map((e, i) => 
          <div key={i} className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out'>
            <Link href={`/projects/${e.title}`} className="hover:text-primary transition-all duration-100 ease-in-out">
              <h1 className='text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline'>{e.title}<FiArrowUpRight/></h1>
            </Link>
            <p className='text-sm line-clamp-3 pt-1'>{e.description}</p>
            <div className='flex flex-row flex-wrap pt-4 md:gap-4 gap-2 justify-between '>
              <div className='inline-flex items-center gap-1'>
                <CiLocationOn className="w-5 h-5"/>
                <span className="font-semibold">{e.location}</span>
              </div>
              <div className='inline-flex items-center gap-1'>
                <CiMoneyBill className="w-5 h-5"/>
                <span className='font-mono font-extralight'>{e.price} INR</span>
              </div>
              <div className='inline-flex items-center gap-1'>
                <CiCalendarDate className="w-5 h-5"/>
                <span className='font-mono font-extralight'>{new Date(e.delivery).toDateString()}</span>
              </div>
              
              
            </div>
          </div>
        )}
        <div className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out'>
            <Link href={`/add-project`} className="hover:text-primary transition-all duration-100 ease-in-out">
              <h1 className='text-xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline'><IoIosAddCircleOutline className="w-6 h-6"/>List A Project</h1>
            </Link>
          </div>
        
      </div>
      :
      <div className="flex justify-center items-center flex-col lg:w-[650px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
         
      <h1 className="text-3xl font-[800] pb-4">Your <span className='text-primary'>Applications</span></h1>
      {applicationsData.length === 0 ? null : applicationsData.map((e, i) => 
        <div key={i} className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1'>
              <span className='font-normal'>Applied for</span>
              <Link href={`/projects/${e.title}`} className="hover:text-primary transition-all duration-100 ease-in-out underline">{e.title}</Link>
            </h1>
            <Badge variant={"secondary"}>Under Review</Badge>
          </div>
          <div className='flex flex-col flex-wrap pt-4 md:gap-4 gap-2 justify-between '>
            
            <div className='inline-flex items-center gap-1'>
              <CiMoneyBill className="w-5 h-5"/>
              <span className='font-mono font-extralight'>{e.price} INR</span>
            </div>
            <div className='inline-flex items-center gap-1'>
              <IoDocumentTextOutline className="w-5 h-5"/>
              <Link href={e.applicant_resume} target='_blank' className='font-semibold'>Resume Submitted</Link>
            </div>
            <div className='inline-flex items-center gap-1'>
              <ClockIcon className="w-5 h-5"/>
              <span className="font-semibold">Applied on {new Date(e.application_created_at ?? e.created_at).toDateString()}</span>
            </div>
          </div>
          <p className='pt-4 line-clamp-3'><span className="font-bold">Application Content:</span> {e.application_content}</p>
        </div>
      )}
      <div className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out'>
          <Link href={`/projects`} className="hover:text-primary transition-all duration-100 ease-in-out">
            <h1 className='text-xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline'><IoIosAddCircleOutline className="w-6 h-6"/>Apply For A Project</h1>
          </Link>
        </div>
      
      </div>
      }
      <div className="flex justify-center items-center flex-col lg:w-[450px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
        <h1 className="text-3xl font-[800]"><span className='text-primary'>Account</span> Settings</h1>
        <div className='w-full'>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={session?.user.email} disabled />
        </div>
        <div className='w-full'>
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='w-full pt-4'>
          <Button
            className="w-full"
            onClick={() => updateProfile({ fullname, username, website })}
            disabled={loading}
            variant={"secondary"}
          >
            {loading ? 'Loading ...' : 'Update Profile'}
          </Button>
        </div>
        <div className='w-full'>
          <form action="/auth/signout" method="post">
            <Button className="w-full hover:bg-primary" variant={"outline"} type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}