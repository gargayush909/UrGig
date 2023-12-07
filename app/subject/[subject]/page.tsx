'use client';
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { cookies } from 'next/headers'
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
// export async function generateStaticParams() {
//   const supabase = createServerActionClient({cookies})
//   const {data:subjects, error} = await supabase.from('subjects').select("name")
//   if (error) {
//     console.error(error)
//     throw error
//   }
//   else {
//     return subjects.map((subject) => ({
//       "subject": subject.name,
//     }))
//   }
// }


export default function Subject({ params }: { params: { subject: string } }) {
  const supabase = createClientComponentClient()
  const [subjectsData, setSubjcetsData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubjects = async() => {
        try {
            setLoading(true);
            const {data:data, error, status} = await supabase.from("subjects").select();
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setSubjcetsData(data);
            }
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    };
    getSubjects();

}, [supabase])
  
  return <div>Subject: {decodeURI(params.subject)}</div>
}