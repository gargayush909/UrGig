'use client';
import React, { useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCallback } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { CiCalendarDate, CiLocationOn, CiMoneyBill } from 'react-icons/ci';
import { FiUser } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProjectForm({session, project, uploaderUser} : {session: Session | null, project: any, uploaderUser: any}) {

  return (
    project ? (
      
      <div className='px-6 py-4 w-full rounded-[var(--radius)] lg:w-[650px] shadow-2xl shadow-gray-100'>
        <h1 className="text-center text-4xl font-bold pb-8"><span className='text-primary'>Project</span> Details</h1>
        <img draggable={false} src={project.image} className='sm:w-full sm:h-[250px] w-full h-auto aspect-video object-cover rounded-2xl' alt={project.title}></img>
          <h1 className='text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 pt-8'>{project.title}</h1>

        <div className='text-sm pt-1'>{project.description.split('\n').length > 0 ? project.description.split('\n').map((e : any, i : any) => <p key={i} className='pt-1'>{e}</p>) : <p>{project.description}</p>}</div>
        <div className='flex sm:flex-row flex-col flex-wrap pt-8 md:gap-8 gap-2 justify-between items-start '>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='inline-flex items-center gap-1'>
                  <CiLocationOn className="w-5 h-5"/>
                  <span className="font-semibold">{project.location}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='inline-flex items-center gap-1'>
                  <CiMoneyBill className="w-5 h-5"/>
                  <span className='font-mono font-extralight'>{project.price} INR</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>On Project Completion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='inline-flex items-center gap-1'>
                  <CiCalendarDate className="w-5 h-5"/>
                  <span className='font-mono font-extralight'>{new Date(project.delivery).toDateString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expected Delivery Date</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className='inline-flex items-center gap-1'>
                  <FiUser className="w-5 h-5"/>
                  <span className='font-semibold'>{uploaderUser?.full_name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Project Listed By</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
        </div>
      </div>
    ) : (
        <h1 className='text-2xl font-semibold'>The project <code className='bg-gray-100 border-[1px] border-gray-300 px-3 rounded-lg'>{decodeURI(project)}</code> does not exist.</h1>
    )

  )
}
