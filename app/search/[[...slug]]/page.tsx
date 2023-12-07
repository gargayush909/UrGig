'use client'
import SearchBar from "@/components/component/search-bar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import Fuse from "fuse.js"
import { type } from "os"
import { Button } from "@/components/ui/button"
import { TailSpin } from "react-loader-spinner"

export default function Search({ params }: { params: { slug: string[] } }) {
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
        if (typeof params.slug !== 'undefined' && params.slug.length === 1) {
            setLoading(true);
            const options = {
                includeScore: true,
                includeMatches: true,
                threshold: 0.4,
                keys: ["name"],
            }
            const fuse = new Fuse(subjectsData, options);
            const results = fuse.search(params.slug[0] || "");
            const items = results.map((result) => result.item);
            setSearchResults(items);
            setLoading(false);
        } else {}
    }, [supabase, params.slug, subjectsData])
    return (params.slug === undefined) ? 
    (
        <div className="min-w-screen flex justify-center items-center h-screen flex-col gap-2 px-4">
            <h1 className="text-4xl tracking-tighter">Search for <b>any subject</b></h1>
            <SearchBar/>
        </div>
    ) : (
        <div className="flex justify-center items-center lg:py-0 py-24">
            
            {params.slug.length === 1 ? 
            <div className="min-w-screen max-w-[1800px] h-screen px-4 flex justify-center items-center flex-col">
                <h1 className="lg:text-6xl text-4xl tracking-tighter font-bold pb-8">Search results</h1>
                <div className="flex flex-wrap lg:[&_button]:flex-[0_0_calc(33%-20px)] md:[&_button]:flex-[0_0_calc(50%-20px)] [&_button]:flex-[0_0_calc(100%-20px)] lg:p-16 md:p-12 p-4 shadow-2xl rounded-3xl shadow-foreground/5 gap-8 justify-center items-center">
                    <TailSpin
                        height="40"
                        width="40"
                        color="purple"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperClass=""
                        visible={loading}
                    />
                    {searchResults.length === 0 && !loading && <h1 className="lg:text-2xl text-xl tracking-tighter">Could not find the subject <b>{params.slug[0]}</b></h1>}
                    {searchResults.map((element, index) => (
                        <Button key={index} className="flex justify-center items-center flex-col p-10 rounded-md hover:text-background" variant={"outline"}>
                            <div className="lg:text-xl text-base">{element.name}</div>
                            <div>Semester {element.semester}</div>
                        </Button>
                    ))}
                </div>
            </div> 
                : 
            <div className="min-w-screen flex justify-center items-center h-screen flex-col gap-2 px-4">
                <h1 className="text-4xl tracking-tighter">Search for <b>any subject</b></h1>
                <SearchBar/>
            </div>
            }
        </div>
    )
  }