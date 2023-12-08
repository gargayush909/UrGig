import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import AccountForm from './account-form'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const {data: userProjects, error: userProjectsError} = await supabase.from("projects").select().eq("user_id", session?.user.id || "")
  const {data: userProfile, error: userProfileError} = await supabase.from("profiles").select().eq("id", session?.user.id || "").single()
  const {data: userApplications, error: userApplicationsError} = await supabase.from("applications").select().eq("applicant_user_id", session?.user.id || "")
  const {data: userApplicationsProjects, error: userApplicationsProjectsError} = await supabase.from("projects").select().in("id", userApplications?.map((e) => e.project_id) || [])
  const applicationsData = userApplicationsProjects?.map(project => {
    const matchingApplication = userApplications?.find(application => application.project_id === project.id)
    if (matchingApplication) {
      return {
        ...project,
        applicant_name: matchingApplication.applicant_name,
        applicant_contact: matchingApplication.applicant_contact,
        applicant_website: matchingApplication.applicant_website,
        applicant_resume: matchingApplication.applicant_resume,
        application_content: matchingApplication.application_content,
      };
    }
    return project;
  })

  return <AccountForm 
  session={session}
  userProjects={userProjectsError ? [] : userProjects}
  applicationsData={applicationsData || []}
  userProfile={userProfileError ? null : userProfile}
  />
}