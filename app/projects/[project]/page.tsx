'use client';
import React, { useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCallback } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { CiCalendarDate, CiLocationOn, CiMoneyBill } from 'react-icons/ci';
import Image from 'next/image';

export default function Project({params} : {params : {project: string}}) {
  const supabase = createClientComponentClient<Database>()
  const [projectDetails, setProjectDetails] = useState<any>()
  const [uploaderUser, setuUploaderUser] = useState<any>()
  const [loading, setLoading] = useState(true)

  // const getUploaderUser = useCallback(async () => {
  //   try {
  //     setLoading(true)
  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select()
  //       .eq('id', projectDetails.user_id)
  //       .single()

  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setuUploaderUser(data)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     alert('Error loading user data!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [supabase, projectDetails])

  const getProject = useCallback(async () => {
    try {
      setLoading(true)
      const projectTitle = decodeURI(params.project)
      const { data, error, status } = await supabase
        .from('projects')
        .select()
        .eq('title', projectTitle)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProjectDetails(data)
      }
    } catch (error) {
      console.error(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [supabase, params])

  useEffect( () => {
    getProject()
    // getUploaderUser()
  }, [getProject])

  return (
    projectDetails ? (
      <div className='flex justify-center items-start min-w-screen px-8 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16'>
      <div className='px-6 py-4 w-full rounded-[var(--radius)] transition-all duration-300 ease-in-out lg:w-[650px] shadow-2xl shadow-gray-100'>
        <img src={projectDetails.image} className='w-full h-auto aspect-video object-cover rounded-2xl' alt={projectDetails.title}></img>
          <h1 className='text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 pt-4'>{projectDetails.title}</h1>

        <div className='text-sm pt-1'>{projectDetails.description.split('\n').length > 0 ? projectDetails.description.split('\n').map((e : any, i : any) => <p key={i} className='pt-1'>{e}</p>) : <p>{projectDetails.description}</p>}</div>
        <div className='flex flex-row flex-wrap pt-4 md:gap-4 gap-2 justify-between '>
          <div className='inline-flex items-center gap-1'>
            <CiLocationOn className="w-5 h-5"/>
            <span className="font-semibold">{projectDetails.location}</span>
          </div>
          <div className='inline-flex items-center gap-1'>
            <CiMoneyBill className="w-5 h-5"/>
            <span className='font-mono font-extralight'>{projectDetails.price} INR</span>
          </div>
          <div className='inline-flex items-center gap-1'>
            <CiCalendarDate className="w-5 h-5"/>
            <span className='font-mono font-extralight'>{new Date(projectDetails.delivery).toDateString()}</span>
          </div>
          
        </div>
      </div>
      </div>
    ) : (
      <div className='flex justify-center items-start min-w-screen px-8 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16'>
        <h1 className='text-2xl font-semibold'>The project <code className='bg-gray-100 border-[1px] border-gray-300 px-3 rounded-lg'>{decodeURI(params.project)}</code> does not exist.</h1>
      </div>
    )

  )
}
