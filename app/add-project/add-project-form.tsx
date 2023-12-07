'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import type { PostgrestError } from '@supabase/supabase-js'
import { Limelight } from 'next/font/google'
import Link from 'next/link'

export default function AddProjectForm({ session }: { session: Session | null }) {

  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<string | null>('')
  const [description, setDescription] = useState<string | null>('')
  const [image, setImage] = useState<string | null>('')
  const [price, setPrice] = useState<string | null>('')
  const [delivery, setDelivery] = useState<string | null>('')
  const [location, setLocation] = useState<string | null>('')
  const [partTime, setPartTime] = useState<boolean | null>(false)
  const user = session?.user

  useEffect(() => {
    setLoading(false)
  }, [])

  async function addProject() {
    try {
      setLoading(true)

      const { error } = await supabase.from('projects').insert({
        user_id: user?.id as string,
        title,
        description,
        image,
        price,
        delivery,
        location,
        part_time: partTime,
      })
      
      if (error) throw error
      alert('Project added!')
      // You can perform additional actions after adding the project if needed
    } catch (error : any) {
      alert(`Error adding the project...\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {session ?
     <>
     {user?.user_metadata.buyer.toString().toLowerCase().startsWith('f') ? 
     <>
      <div className='flex justify-center items-center min-w-screen px-8 py-24'>
        <div className="flex justify-center items-center flex-col lg:w-[750px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
          <h1 className="text-5xl w-full font-[800] text-center">List Your Project<br/><span className="text-base font-[400] pb-2">This will help you in finding people who are willing to work!</span></h1>
          <div className='w-full pt-6'>
            <Label htmlFor="title">Project{"'"}s Title</Label>
            <Input
              id="title"
              type="text"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="description">Project{"'"}s Description</Label>
            <Textarea
              id="description"
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="image">Project{"'"}s Image URL</Label>
            <Input
              id="image"
              type="text"
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="price">Price (For Project Completion)</Label>
            <Input
              id="price"
              type="number"
              value={price || ''}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="delivery">Expected Date of Project Completion</Label>
            <Input
              id="delivery"
              type="date"
              value={delivery || ''}
              onChange={(e) => setDelivery(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="location">Location (On Site/Remote)</Label>
            <Input
              id="location"
              type="text"
              value={location || ''}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='w-full'>
            <Label htmlFor="partTime">Are you hiring a part-time employee?</Label>
            <Input
              id="partTime"
              type="checkbox"
              checked={partTime || false}
              onChange={(e) => setPartTime(e.target.checked)}
              className='self-start text-left w-6 h-6 border-primary'
            />
          </div>
          <div className='w-full pt-4'>
            <Button
              className="w-full"
              onClick={addProject}
              disabled={loading}
              variant={"secondary"}
            >
              {loading ? 'Loading ...' : 'List Your Project'}
            </Button>
          </div>
        </div>
    </div>
     </> 
     : 
     <>
     <div className='flex justify-center items-center min-w-screen px-8 py-24'>
        <span className="text-2xl">You cannot list your projects as this is a freelancer account.<br/> <Link className='font-bold hover:underline' href="/signin">Sign In</Link> with an <u>employer account</u> if you wish to list project openings.</span>
      </div>
     </>
     }
    
     </> :
      <div className='flex justify-center items-center min-w-screen px-8 py-24'>
        <span className="text-2xl">Please <Link className='font-bold hover:underline' href="/signin">Sign In</Link> to continue.</span>
      </div>
    }
    
    </>
  )
}
