import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ProjectsClient from "./projects";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export default async function Projects() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {data: { session }} = await supabase.auth.getSession()
  const {data: projects, error: projectError} = await supabase.from('projects').select()
  return (
    <ProjectsClient {...{projects: projectError ? [] : projects}}/>
  )
}