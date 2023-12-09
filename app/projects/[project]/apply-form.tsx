'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CiLocationOn, CiMoneyBill } from 'react-icons/ci'
import { ClockIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { FaRegUser } from 'react-icons/fa6'
import { FiPhone } from 'react-icons/fi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { TfiWorld } from 'react-icons/tfi'
import { Badge } from '@/components/ui/badge'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  applicantName: Yup.string().required('Name is required').max(200),
  applicantContact: Yup.string()
    .required('Contact information is required')
    .matches(phoneRegExp, 'Contact Number is not valid'),
  applicantWebsite: Yup.string()
    .url('Invalid URL format')
    .required('Website URL is required'),
  applicantResume: Yup.string()
    .url('Invalid URL format')
    .required('Resume URL is required'),
  applicationContent: Yup.string()
    .required('Content is required')
    .min(500)
    .max(3000),
})

const ApplicationForm = ({
  session,
  project,
  uploaderUser,
  applicationsRecieved,
}: {
  session: Session | null
  project: any
  uploaderUser: any
  applicationsRecieved: any[]
}) => {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const initialValues = {
    applicantName: '',
    applicantContact: '',
    applicantWebsite: '',
    applicantResume: '',
    applicationContent: '',
  }

  const submitApplication = async (values: FormikValues) => {
    try {
      setLoading(true)

      const { error } = await supabase.from('applications').insert({
        project_owner_user_id: uploaderUser.id,
        project_id: project.id,
        applicant_user_id: session?.user?.id,
        applicant_name: values.applicantName,
        applicant_contact: values.applicantContact,
        applicant_website: values.applicantWebsite,
        applicant_resume: values.applicantResume,
        application_content: values.applicationContent,
      })

      if (error) throw error

      // alert('Application submitted!')
      router.push('/account')
    } catch (error: any) {
      alert(`Error submitting the application...\n${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {session?.user.user_metadata.buyer ? (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitApplication}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="lg:w-[400px] w-full flex flex-col gap-4 px-6 py-4 pb-8 rounded-[var(--radius)] shadow-2xl shadow-gray-100">
                <h1 className="text-center text-4xl font-bold pb-8">
                  <span className="text-primary">Apply </span> For Project
                </h1>

                <div>
                  <Label htmlFor="email">Name</Label>
                  <Field
                    className={cn(
                      'input p-2 rounded-sm',
                      errors.applicantName && touched.applicantName && ''
                    )}
                    id="applicantName"
                    name="applicantName"
                    placeholder="Ayush Garg"
                    as={Input}
                    type="applicantName"
                  />
                  {errors.applicantName && touched.applicantName ? (
                    <div className="text-red-600 text-xs w-full text-right">
                      {errors.applicantName}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="email">Contact Info</Label>
                  <Field
                    className={cn(
                      'input p-2 rounded-sm',
                      errors.applicantContact && touched.applicantContact && ''
                    )}
                    id="applicantContact"
                    name="applicantContact"
                    type="text"
                    as={Input}
                    placeholder="98123496XX"
                  />
                  {errors.applicantContact && touched.applicantContact ? (
                    <div className="text-red-600 text-xs w-full text-right">
                      {errors.applicantContact}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="email">Website</Label>
                  <Field
                    className={cn(
                      'input p-2 rounded-sm',
                      errors.applicantWebsite && touched.applicantWebsite && ''
                    )}
                    id="applicantWebsite"
                    name="applicantWebsite"
                    placeholder="Your Portfolio / Your LinkedIn"
                    type="text"
                    as={Input}
                  />
                  {errors.applicantWebsite && touched.applicantWebsite ? (
                    <div className="text-red-600 text-xs w-full text-right">
                      {errors.applicantWebsite}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="email">Resume</Label>
                  <Field
                    className={cn(
                      'input p-2 rounded-sm',
                      errors.applicantResume && touched.applicantResume && ''
                    )}
                    id="applicantResume"
                    name="applicantResume"
                    placeholder="Google Drive Link"
                    type="text"
                    as={Input}
                  />
                  {errors.applicantResume && touched.applicantResume ? (
                    <div className="text-red-600 text-xs w-full text-right">
                      {errors.applicantResume}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="email">Why do you want this project?</Label>
                  <Field
                    className={cn(
                      'input p-2 rounded-sm',
                      errors.applicationContent &&
                        touched.applicationContent &&
                        ''
                    )}
                    id="applicationContent"
                    name="applicationContent"
                    placeholder="Write something..."
                    as={Textarea}
                  />
                  {errors.applicationContent && touched.applicationContent ? (
                    <div className="text-red-600 text-xs w-full text-right">
                      {errors.applicationContent}
                    </div>
                  ) : null}
                </div>

                <Button
                  variant={'outline'}
                  className="w-full mt-4 hover:bg-primary text-base"
                  type="submit"
                  disabled={loading || isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <div>
          {applicationsRecieved.length !== 0 ? (
            <div className="flex justify-center items-center flex-col max-w-[1000px] w-full lg:gap-8 gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
              <h1 className="text-3xl font-[800]">
                <span className="text-primary">Applications</span> Recieved
              </h1>
              <h1 className="text-left">
                Please visit{' '}
                <Link
                  className="underline hover:text-primary"
                  href={'/account'}
                >
                  dashboard
                </Link>{' '}
                for more actions.
              </h1>
              {applicationsRecieved.map((e, i) => (
                <div
                  key={i}
                  className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out"
                >
                  <div className="inline-flex w-full justify-between items-center">
                    <h1 className="text-lg font-semibold inline-flex flex-row items-center gap-1 line-clamp-1">
                      <span className="text-lg tracking-wide">
                        Application {i + 1}
                      </span>
                      <Link
                        href={`/projects/${e.project_title}`}
                        className="hover:text-primary underline transition-all duration-100 ease-in-out"
                      >
                        {e.project_title}
                      </Link>
                    </h1>
                  </div>
                  <div className="text-sm pt-1">
                    {e.application_content
                      .split('\n')
                      .map((e: string, i: number) => (
                        <p key={i} className="pt-2">
                          {e}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default ApplicationForm
