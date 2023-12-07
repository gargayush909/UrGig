'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CiLocationOn, CiCalendarDate, CiMoneyBill } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Array<any>>([])

  const getProjects = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('projects')
        .select()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProjects(data)
      }
    } catch (error) {
      console.error(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])


  useEffect(() => {
    getProjects()
  }, [getProjects])


  return (
    <div className='flex justify-center items-start min-w-screen px-8 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16'>
      <div className="flex justify-center items-center flex-col w-fit gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
        <h1 className="text-4xl font-[800] pb-4">All <span className='text-primary'>Projects</span></h1>
        <div className='flex justify-center items-center flex-row flex-wrap gap-8'>
            {projects.length === 0 ? <h1 className="text-lg text-center">Currently, there are no projects listed.<br/><Link className="underline" href="/add-project">Add a project here.</Link></h1> : projects.map((e, i) => 
                <div key={i} className='px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] hover:bg-accent/[2%] transition-all duration-300 ease-in-out lg:w-[500px]'>
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
        
        
      </div>
    </div>
  )
}