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

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [college, setCollege] = useState<string | null>(null)
  const [userProjects, setUserProjects] = useState<Array<any>>([])
  const user = session?.user

  const getUserProjects = useCallback(async () => {
    try {
      setLoading(true)
      const userID : string = user?.id || "";

      const { data, error, status } = await supabase
        .from('projects')
        .select()
        .eq('user_id', userID)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUserProjects(data)
      }
    } catch (error) {
      console.error(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const userID : string = user?.id || "";

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', userID)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.error(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
    getUserProjects()
  }, [user, getProfile, getUserProjects])

  async function updateProfile({
    username,
    fullname,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
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
    <div className='flex justify-center items-start min-w-screen px-8 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16'>
      {!user?.user_metadata.buyer ?
      
      <div className="flex justify-center items-center flex-col lg:w-[550px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
         
        <h1 className="text-3xl font-[800] pb-4"><span className='text-primary'>Projects</span> Listed</h1>
        {userProjects.length === 0 ? <h1 className="text-lg text-center">You have no projects listed.<br/><Link className="underline" href="/add-project">Add a project here.</Link></h1> : userProjects.map((e, i) => 
          <div key={i} className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] hover:bg-accent/[2%] transition-all duration-300 ease-in-out'>
            <Link href={`/projects/${e.title}`} className="hover:text-accent transition-all duration-100 ease-in-out">
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
        
      </div>
      
      :
      null
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
        <div className='w-full'>
          <Label htmlFor="website">Avatar URL</Label>
          <Input
            id="avatar_url"
            type="url"
            value={avatar_url || ''}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <div className='w-full pt-4'>
          <Button
            className="w-full"
            onClick={() => updateProfile({ fullname, username, website, avatar_url })}
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