import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import ProjectForm from './project-form'
import ApplicationForm from './apply-form'

export async function generateStaticParams({
  params,
}: {
  params: { project: string }
}) {
  const projects = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + "/rest/v1/" + "projects?select=*", 
  {cache: "force-cache", headers: {
    "Content-Type": "application/json",
    "Apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  } as HeadersInit,
}).then((res) => res.json())
  return projects.map((x: {title: string}) => ({project: x.title}))
}

export default async function Project({
  params,
}: {
  params: { project: string }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select()
    .eq('title', decodeURI(params.project))
    .single()
  const { data: uploaderUser, error: uploaderUserError } = await supabase
    .from('profiles')
    .select()
    .eq('id', project?.user_id ?? '')
    .single()
  const { data: applicationsRecieved, error: applicationsRecievedError } =
    await supabase
      .from('applications')
      .select()
      .eq('project_owner_user_id', session?.user.id || '')

  return (
    <>
      {project ? (
        <div
          className={`flex justify-center items-${
            !!applicationsRecieved ? 'center' : 'start'
          } min-w-screen px-8 pt-12 pb-24 lg:flex-${
            !!applicationsRecieved ? 'col' : 'row'
          } flex-col gap-16`}
        >
          <ProjectForm
            {...{
              session: session,
              project: projectError ? params.project : project,
              uploaderUser: uploaderUserError ? null : uploaderUser,
            }}
          />
          <ApplicationForm
            {...{
              session: session,
              project: projectError ? params.project : project,
              uploaderUser: uploaderUserError ? null : uploaderUser,
              applicationsRecieved: applicationsRecievedError
                ? []
                : applicationsRecieved,
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-start min-w-screen px-8 pt-12 pb-24 lg:flex-row flex-col gap-16">
          <h1 className="text-2xl font-semibold">
            The project{' '}
            <code className="bg-gray-100 border-[1px] border-gray-300 px-3 rounded-lg">
              {decodeURI(params.project)}
            </code>{' '}
            does not exist.
          </h1>
        </div>
      )}
    </>
  )
}