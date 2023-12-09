'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { PostgrestError } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Tables } from '@/types/supabase'
import { CiLocationOn, CiCalendarDate, CiMoneyBill } from 'react-icons/ci'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegClock } from 'react-icons/fa6'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { ClockIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useRouter} from "next/navigation"
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TfiWorld } from "react-icons/tfi";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BsTextParagraph } from "react-icons/bs";


export default function AccountForm({
  session,
  userProfile,
  userProjects,
  applicationsData,
  applicationsRecievedData,
}: {
  session: Session | null
  userProfile: any
  userProjects: any[]
  applicationsData: any[]
  applicationsRecievedData: any[]
}) {
  const user = session?.user
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState<string>(userProfile.full_name)
  const [username, setUsername] = useState<string>(userProfile.username)
  const [website, setWebsite] = useState<string>(userProfile.website)

  async function handleApplicationsDeletion( e : any ) {
    try {
      setLoading(true)
      const { error: error } = await supabase.from('applications').delete().match({ project_id: e.project_id }).filter('id', 'neq', e.id)
      const { error: error2 } = await supabase.from('applications').update({selected: true}).eq("id", e.id)
      if (error) throw error
      if (error2) throw error2
      alert('All other applications deleted for the project.')
      router.refresh()
    } catch (error : any){
      console.error(error)
      alert(`Error occured:\n${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function handleProjectDeletion(e: any) {
    try {
      setLoading(true)
      const { error: error } = await supabase.from('projects').delete().eq('id', e.id)
      if (error) throw error
      alert(`Project listing for ${e.title} delted successfully`)
      router.refresh()
    } catch (error : any){
      console.error(error)
      alert(`Error occured:\n${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function handleApplicationDeletion(e: any) {
    try {
      setLoading(true)
      const { error: error } = await supabase.from('applications').delete().eq('id', e.id)
      if (error) throw error
      alert(`Application listing delted successfully`)
      router.refresh()
    } catch (error : any){
      console.error(error)
      alert(`Error occured:\n${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    fullname,
    website,
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
    } catch (error: any) {
      alert(`Error updating the data...\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center flex-wrap items-start min-w-screen lg:px-8 px-0 py-24 lg:flex-row flex-col lg:gap-24 gap-16">
      <div className="flex justify-center items-center flex-col lg:w-[450px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
        <h1 className="text-3xl font-[800]">
          <span className="text-primary">Account</span> Settings
        </h1>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={session?.user.email} disabled />
        </div>
        <div className="w-full">
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full pt-4">
          <Button
            className="w-full"
            onClick={() => updateProfile({ fullname, username, website })}
            disabled={loading}
            variant={'secondary'}
          >
            {loading ? 'Loading ...' : 'Update Profile'}
          </Button>
        </div>
        <div className="w-full">
          <form action="/auth/signout" method="post">
            <Button
              className="w-full hover:bg-primary"
              variant={'outline'}
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </div>
      </div>
      {!user?.user_metadata.buyer ? (
        <>
          <div className="flex justify-center items-center flex-col lg:w-[650px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
            <h1 className="text-3xl font-[800] pb-4">
              <span className="text-primary">Projects</span> Listed
            </h1>
            {userProjects.length === 0
              ? null
              : userProjects.map((e, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out"
                  >
                    <div
                      className="inline-flex justify-between items-center w-full"
                    >
                      <Link
                      href={`/projects/${e.title}`}
                      className="inline-flex justify-between items-center">
                      <h1 className="text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline hover:text-primary transition-all duration-100 ease-in-out">
                        {e.title}
                        <FiArrowUpRight />
                      </h1> 
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger className='p-2 border-[1px] border-destructive rounded-[var(--radius)] hover:bg-destructive/10 text-sm transition-colors ease-in-out duration-300'>
                          <RiDeleteBin2Line />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-destructive">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Doing this will <i>permanently</i> delete your project listing<b> {e.title}</b>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-background border-destructive">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/80 text-background" onClick={() => {handleProjectDeletion(e)}}>Continue</AlertDialogAction>   
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <p className="text-sm line-clamp-3 pt-1">{e.description}</p>
                    <div className="flex flex-row flex-wrap pt-4 md:gap-4 gap-2 justify-between ">
                      <div className="inline-flex items-center gap-1">
                        <CiLocationOn className="w-5 h-5" />
                        <span className="font-semibold">{e.location}</span>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <CiMoneyBill className="w-5 h-5" />
                        <span className="font-mono font-extralight">
                          {e.price} INR
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <CiCalendarDate className="w-5 h-5" />
                        <span className="font-mono font-extralight">
                          {new Date(e.delivery).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            <div className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out">
              <Link
                href={`/add-project`}
                className="hover:text-primary transition-all duration-100 ease-in-out"
              >
                <h1 className="text-xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline">
                  <IoIosAddCircleOutline className="w-6 h-6" />
                  List A Project
                </h1>
              </Link>
            </div>
          </div>

          <div>
            {applicationsRecievedData.length !== 0 ? (
              <div className="flex justify-center items-center flex-col max-w-[1000px] w-full lg:gap-8 gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
                <h1 className="text-3xl font-[800] pb-4">
                  <span className="text-primary">Applications</span> Recieved
                </h1>
                {applicationsRecievedData.map((e, i) => (
                      <div
                        key={i}
                        className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out"
                      >
                        <div className="inline-flex w-full justify-between items-center">
                          
                            <h1 className="text-lg font-semibold inline-flex flex-row items-center gap-1 line-clamp-1">
                              <span className="text-lg tracking-wide">{e.selected ? e.applicant_name :"Someone"} applied for</span>
                              <Link href={`/projects/${e.project_title}`} className="hover:text-primary underline transition-all duration-100 ease-in-out">{e.project_title}</Link>
                            </h1>
                          
                          {e.selected ? 
                          <>
                          <Badge variant="secondary">Application Selected</Badge>
                          </>
                          :
                          <AlertDialog>
                            <AlertDialogTrigger className='px-4 py-1 border-[1px] border-primary rounded-[var(--radius)] hover:bg-primary text-sm transition-colors ease-in-out duration-300'>
                              Select This Application
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Doing this will assign your project <b>{e.project_title}</b> to this applicant and all other applications for <b>{e.project_title}</b> will be deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => {handleApplicationsDeletion(e)}}>Continue</AlertDialogAction>   
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          }
                          
                        </div>
                        <div className="text-sm pt-1">
                          {e.application_content.split("\n").map((e :string, i: number) => <p key={i} className='pt-2'>{e}</p>)}
                        </div>
                        <h1 className="text-base font-semibold pt-4">Project Details</h1>
                        <div className="flex flex-row flex-wrap pt-2 md:gap-4 gap-2 justify-between ">
                          <div className="inline-flex items-center gap-1">
                            <CiLocationOn className="w-5 h-5" />
                            <span className="font-semibold">{e.project_location}</span>
                          </div>
                          <div className="inline-flex items-center gap-1">
                            <CiMoneyBill className="w-5 h-5" />
                            <span className="font-mono font-extralight">
                              {e.project_price} INR
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1">
                            <ClockIcon className="w-5 h-5" />
                            <span className="font-mono font-extralight">
                              {new Date(e.application_created_at).toDateString()}
                            </span>
                          </div>
                        </div>
                        {e.selected ? 
                        <div className="pt-4">
                          <h1 className="text-xl font-semibold">Selected Applicant Details</h1>
                          <div className="flex flex-row flex-wrap pt-4 md:gap-4 gap-2 justify-between ">
                          <div className="inline-flex items-center gap-1">
                            <FaRegUser className="w-5 h-5" />
                            <span className="font-semibold">{e.applicant_name}</span>
                          </div>
                          <div className="inline-flex items-center gap-1">
                            <FiPhone className="w-5 h-5" />
                            <span className="font-semibold mb-1">
                              {e.applicant_contact}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1">
                            <IoDocumentTextOutline className="w-5 h-5" />
                            <Link href={e.applicant_resume} className="font-semibold underline">
                            Resume
                            </Link>
                          </div>
                          <div className="inline-flex items-center gap-1">
                            <TfiWorld className="w-5 h-5" />
                            <Link href={e.applicant_website} className="font-semibold underline">
                            Website  
                            </Link>
                          </div>
                        </div>
                        </div>
                        : null
                        }
                        
                      </div>
                    ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col lg:w-[650px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
          <h1 className="text-3xl font-[800] pb-4">
            Your <span className="text-primary">Applications</span>
          </h1>
          {applicationsData.length === 0
            ? null
            : applicationsData.map((e, i) => (
                <div
                  key={i}
                  className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1">
                      <span className="font-normal">Applied for</span>
                      <Link
                        href={`/projects/${e.title}`}
                        className="hover:text-primary transition-all duration-100 ease-in-out underline"
                      >
                        {e.title}
                      </Link>
                    </h1>
                    <AlertDialog>
                      <AlertDialogTrigger className='p-2 border-[1px] border-destructive rounded-[var(--radius)] hover:bg-destructive/10 text-sm transition-colors ease-in-out duration-300'>
                        <RiDeleteBin2Line />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-destructive">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Doing this will <b>permanently delete</b> your application listing for <b> {e.title}</b>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:bg-background border-destructive">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive hover:bg-destructive/80 text-background" onClick={() => {handleApplicationDeletion(e)}}>Continue</AlertDialogAction>   
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex flex-row flex-wrap pt-4 md:gap-4 gap-2 justify-between ">
                    <div className="inline-flex items-center gap-1">
                      <CiMoneyBill className="w-5 h-5" />
                      <span className="font-mono font-extralight">
                        {e.price} INR
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <IoDocumentTextOutline className="w-5 h-5" />
                      <Link
                        href={e.applicant_resume}
                        target="_blank"
                        className="font-semibold underline"
                      >
                        Resume Submitted
                      </Link>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <ClockIcon className="w-5 h-5" />
                      <span className="font-semibold">
                        Applied on{' '}
                        {new Date(
                          e.application_created_at ?? e.created_at
                        ).toDateString()}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <BsTextParagraph className="w-5 h-5" />
                      <Popover>
    <PopoverTrigger className="font-semibold underline">Application Content</PopoverTrigger>
    <PopoverContent className="lg:w-[550px]">
      {e.application_content.split("\n").map((e2 : any, i2 : number) => <p className='pt-2 text-xs' key={i2}>{e2}</p>)}
      </PopoverContent>
  </Popover> 
                    </div>
                  </div>
                     
                </div>
              ))}
          <div className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out">
            <Link
              href={`/projects`}
              className="hover:text-primary transition-all duration-100 ease-in-out"
            >
              <h1 className="text-xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline">
                <IoIosAddCircleOutline className="w-6 h-6" />
                Apply For A Project
              </h1>
            </Link>
          </div>
        </div>
      )}
      
    </div>
  )
}
