import { Button } from '@/components/ui/button'
import Image from 'next/image'
import LandingPageLottie from './landing-page-lottie'
import SearchBar from './search-bar'
import { Skeleton } from '../ui/skeleton'
import { UrGigLogo } from './UrGigLogo'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import ReactSimplyCarousel from 'react-simply-carousel'
import LandingPageCarouselSection from './landing-page-carousel-section'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="lg:h-screen h-auto lg:pt-0 mt-0 lg:mt-[-64px] pt-24 flex justify-center items-center lg:flex-row flex-col xl:gap-16 gap-4 px-4 lg:px-8">
          <div className="">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to{' '}
                <span className="font-[600]">
                  Ur<span className="text-primary font-[800]">Gig</span>
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                The best freelance platform out there.
              </p>
              <div className="flex justify-center items-center gap-4 pt-6">
                <Link href="/projects">
                  <Button
                    variant={'secondary'}
                    className="lg:text-base text-xs"
                  >
                    Browse Projects
                    <ArrowRightIcon className="ml-2" />
                  </Button>
                </Link>
                <Link href="/add-project">
                  <Button
                    variant={'outline'}
                    className="lg:text-base text-xs hover:bg-primary"
                  >
                    Post Your Project
                    <ArrowRightIcon className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <LandingPageLottie></LandingPageLottie>
          </div>
        </section>
        <LandingPageCarouselSection></LandingPageCarouselSection>
      </main>
    </div>
  )
}
