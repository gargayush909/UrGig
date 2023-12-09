'use client'
import Link from 'next/link'
import { CiLocationOn, CiCalendarDate, CiMoneyBill } from 'react-icons/ci'
import { FiArrowUpRight } from 'react-icons/fi'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag))
    : projects

  return (
    <div className="flex justify-center items-start min-w-screen px-8 py-24 lg:flex-row-reverse flex-col-reverse lg:gap-24 gap-16">
      <div className="flex justify-center items-center flex-col w-fit max-w-[1150px] gap-4 p-12 rounded-2xl shadow-2xl shadow-gray-100">
        <h1 className="text-5xl font-[800] pb-4">
          All <span className="text-primary">Projects</span>
        </h1>
        <div className="mb-4 flex justify-center items-center gap-4">
          <Label htmlFor="select-tag" className="text-lg font-semibold">
            Select Category{' '}
          </Label>
          <select
            value={selectedTag || 'All'}
            onChange={(e: any) => setSelectedTag(e.target.value || null)}
            className="border-primary border p-2 rounded-md"
            id="select-tag"
          >
            <option value="">All</option>
            {Array.from(
              new Set(projects.flatMap((project) => project.tags))
            ).map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-start flex-row flex-wrap gap-8">
          {filteredProjects.length === 0 ? (
            <h1 className="text-lg text-center">
              Currently, there are no projects listed.
              <br />
              <Link className="underline" href="/add-project">
                Add a project here.
              </Link>
            </h1>
          ) : (
            filteredProjects.map((e, i) => (
              <div
                key={i}
                className="px-6 py-4 w-full rounded-[var(--radius)] border-secondary border-[1px] transition-all duration-300 ease-in-out lg:w-[500px]"
              >
                <Link
                  href={`/projects/${e.title}`}
                  className="hover:text-primary transition-all duration-100 ease-in-out"
                >
                  <h1 className="text-2xl font-semibold inline-flex flex-row items-center gap-1 line-clamp-1 hover:underline">
                    {e.title}
                    <FiArrowUpRight />
                  </h1>
                </Link>
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}
