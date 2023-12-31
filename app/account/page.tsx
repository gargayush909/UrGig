import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import AccountForm from './account-form'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { data: userProjects, error: userProjectsError } = await supabase
    .from('projects')
    .select()
    .eq('user_id', session?.user.id || '')
  const { data: userProfile, error: userProfileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', session?.user.id || '')
    .single()
  const { data: userApplications } = await supabase
    .from('applications')
    .select()
    .eq('applicant_user_id', session?.user.id || '')
  const { data: userApplicationsProjects } = await supabase
    .from('projects')
    .select()
    .in('id', userApplications?.map((e) => e.project_id) || [])
  const { data: applicationsRecieved, error: applicationsRecievedError } =
    await supabase
      .from('applications')
      .select()
      .eq('project_owner_user_id', session?.user.id || '')

  const applicationsData = userApplicationsProjects?.map((project) => {
    const matchingApplication = userApplications?.find(
      (application) => application.project_id === project.id
    )
    if (matchingApplication) {
      return {
        ...project,
        applicant_name: matchingApplication.applicant_name,
        applicant_contact: matchingApplication.applicant_contact,
        applicant_website: matchingApplication.applicant_website,
        applicant_resume: matchingApplication.applicant_resume,
        application_content: matchingApplication.application_content,
      }
    }
    return project
  })
  const applicationsRecievedData = applicationsRecieved?.map((project) => {
    const matchingApplication = userProjects?.find(
      (application) => application.id === project.project_id
    )
    if (matchingApplication) {
      return {
        ...project,
        project_title: matchingApplication.title,
        project_price: matchingApplication.price,
        project_location: matchingApplication.location,
        project_id: matchingApplication.id,
      }
    }
    return project
  })

  return (
    <AccountForm
      session={session}
      userProjects={userProjectsError ? [] : userProjects}
      applicationsData={applicationsData || []}
      userProfile={userProfileError ? null : userProfile}
      applicationsRecievedData={applicationsRecievedData || []}
    />
  )
}
