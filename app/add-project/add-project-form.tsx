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
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
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

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string()
    .url('Enter a valid URL')
    .required('Image URL is required'),
  price: Yup.number().required('Price is required'),
  delivery: Yup.date().required(
    'Expected Date of Project Completion is required'
  ),
  location: Yup.string().required('Location is required'),
  tags: Yup.array().of(Yup.string()).required('Tags are required').required("At least one tag is required."),
})

export default function AddProjectForm({
  session,
}: {
  session: Session | null
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const user = session?.user

  useEffect(() => {
    setLoading(false)
  }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      price: 0,
      delivery: '',
      location: '',
      part_time: false,
      tags: []
    },
    validationSchema,
    onSubmit: addProject,
  })

  async function addProject() {
    try {
      setLoading(true)
      const tagsArray = formik.values.tags.map((tag) => tag.trim());
      const { error } = await supabase.from('projects').insert({
        user_id: user?.id,
        ...formik.values,
        tags: tagsArray,
      })
      if (error) {
        throw error
      }
      setSuccessMessage('Project listed successfully!')
      // You can perform additional actions after adding the project if needed
    } catch (error: any) {
      alert(`Error adding the project...\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {session ? (
        <>
          {user?.user_metadata.buyer
            .toString()
            .toLowerCase()
            .startsWith('f') ? (
            <>
              <div className="flex justify-center items-center min-w-screen px-8 py-24">
                <div className="flex justify-center items-center flex-col lg:w-[750px] w-full gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
                  <div className="text-5xl w-full font-[800] text-center inline-flex flex-col gap-3">
                    <h1>
                      List A <span className="text-primary">Project</span>
                    </h1>
                    <span className="text-base font-[400] pb-2">
                      This will help you in finding people who are willing to
                      work!
                    </span>
                  </div>
                  <div className="w-full pt-6">
                    <Label htmlFor="title">Project{"'"}s Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.title}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="description">
                      Project{"'"}s Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="error-message text-xs text-right text-destructive pt-1">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="image">Project{"'"}s Image URL</Label>
                    <Input
                      id="image"
                      type="text"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.image}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="price">
                      Price (For Project Completion)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="delivery">
                      Expected Date of Project Completion
                    </Label>
                    <Input
                      id="delivery"
                      type="date"
                      value={formik.values.delivery}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.delivery && formik.errors.delivery && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.delivery}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="location">Location (On Site/Remote)</Label>
                    <Input
                      id="location"
                      type="text"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.location}
                      </div>
                    )}
                  </div>
                  {/* <div className="w-full">
                    <Label htmlFor="part_time">
                      Are you hiring a part-time employee?
                    </Label>
                    <Input
                      id="part_time"
                      type="checkbox"
                      checked={formik.values.part_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="self-start text-left w-6 h-6 border-primary"
                    />
                    {formik.touched.part_time && formik.errors.part_time && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.part_time}
                      </div>
                    )}
                  </div> */}
                  <div className="w-full">
                    <Label htmlFor="tags">Tags (Separate By Comma)</Label>
                    <Input
                      id="tags"
                      type="text"
                      value={formik.values.tags}
                      onChange={(e) => {
                        formik.setFieldValue('tags', e.target.value.split(','))
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.tags && formik.errors.tags && (
                      <div className="error-message text-xs text-right text-destructive pt-1">
                        {formik.errors.tags}
                      </div>
                    )}
                  </div>
                  <div className="w-full pt-4">
                  <AlertDialog>
                    <AlertDialogTrigger 
                    className="w-full bg-primary rounded-md py-2"
                    disabled={loading || !formik.isValid}
                    >
                      {loading ? 'Loading ...' : 'List Your Project'}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Project Listing Fee: 500 INR</AlertDialogTitle>
                        <AlertDialogDescription>
                          A payment of 500 INR must be done in order to list a project on our website.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                        onClick={() => {
                          formik.handleSubmit()
                        }}
                        >Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                    {/* <Button
                      className="w-full"
                      onClick={() => {
                        formik.handleSubmit()
                      }}
                      disabled={loading || !formik.isValid}
                      variant={'secondary'}
                    >
                      {loading ? 'Loading ...' : 'List Your Project'}
                    </Button> */}
                  </div>
                  {successMessage === '' ? null : (
                    <div className="flex justify-center items-center flex-col gap-1">
                      <h1 className="text-base text-primary text-center">
                        {successMessage}
                      </h1>
                      <Link className="text-sm" href={'/account'}>
                        Click here to view your project listings
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center min-w-screen px-8 py-24">
                <span className="text-2xl">
                  You cannot list your projects as this is a freelancer account.
                  <br />{' '}
                  <Link className="font-bold hover:underline" href="/signin">
                    Sign In
                  </Link>{' '}
                  with an <u>employer account</u> if you wish to list project
                  openings.
                </span>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-w-screen px-8 py-24">
          <span className="text-2xl">
            Please{' '}
            <Link className="font-bold hover:underline" href="/signin">
              Sign In
            </Link>{' '}
            to continue.
          </span>
        </div>
      )}
    </>
  )
}
