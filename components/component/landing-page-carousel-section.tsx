'use client'
import React from 'react'
import ReactSimplyCarousel from 'react-simply-carousel'
import { useState } from 'react'
import { FaQuoteLeft } from "react-icons/fa";

export default function LandingPageCarouselSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  return (
    <section className="min-w-screen flex justify-center items-center py-24 bg-secondary/5 flex-col">
        <h1 className='lg:text-5xl text-3xl font-semibold tracking-tighter pb-8'>Here{"'"}s what our users say...</h1>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 1,
            minWidth: 500,
            maxWidth: 1920
          },
        ]}
        speed={800}
        easing="linear"
        autoplay={true}
        delay={1500}
        centerMode={true}
        infinite={true}
        disableSwipeByMouse={true}
        disableSwipeByTouch={true}
        itemsListProps={{style: {gap: "50px"}}}
      >
        <div className="lg:p-8 p-4 bg-primary/20 w-[600px] flex justify-center items-start flex-col rounded-xl">
            <FaQuoteLeft className="w-6 h-6"/>
          <p className="mb-4 text-lg mt-4">

              I had the pleasure of working with an amazing client through
              delance. From start to finish, the experience was seamless. The
              project details were clear, communication was prompt and
              efficient, and any queries I had related to payments were
              addressed promptly.

          </p>
          <div className="flex items-center">
            <img
              alt="Sakshi Mehra"
              className="rounded-full mr-4 mix-blend-screen"
              height="50"
              src={"https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg"}
              style={{
                aspectRatio: '50/50',
                objectFit: 'cover',
              }}
              width="50"
            />
            <div>
              <p className="font-semibold">Sakshi Mehra</p>
              <p className="text-sm">Graphic Designer</p>
            </div>
          </div>
        </div>
        <div className="lg:p-8 p-4 bg-primary/20 w-[600px] flex justify-center items-start flex-col rounded-xl">
            <FaQuoteLeft className="w-6 h-6"/>
          <p className="mb-4 text-lg mt-4">
            I had a fantastic experience on this platform! The
            quality of professionals available here is
            impressive. I found a skilled web developer who
            delivered exceptional work within my budget. The
            decentralized nature of the website ensures
            transparency and security. A great place to find
            talented freelancers.
          </p>
          <div className="flex items-center">
            <img
              alt="Sakshi Mehra"
              className="rounded-full mr-4 mix-blend-screen"
              height="50"
              src={"https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg"}
              style={{
                aspectRatio: '50/50',
                objectFit: 'cover',
              }}
              width="50"
            />
            <div>
              <p className="font-semibold">Reyansh Dixit</p>
              <p className="text-sm">Blogger</p>
            </div>
          </div>
        </div>
        <div className="lg:p-8 p-4 bg-primary/20 w-[600px] flex justify-center items-start flex-col rounded-xl">
            <FaQuoteLeft className="w-6 h-6"/>
          <p className="mb-4 text-lg mt-4">
          I look forward to working with this platform again
            in the future and would highly recommend them to
            other freelancers. It{"'"}s been a fantastic experience.
          </p>
          <div className="flex items-center">
            <img
              alt="Sakshi Mehra"
              className="rounded-full mr-4 mix-blend-screen"
              height="50"
              src={"https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg"}
              style={{
                aspectRatio: '50/50',
                objectFit: 'cover',
              }}
              width="50"
            />
            <div>
              <p className="font-semibold">Diksha</p>
              <p className="text-sm">Web Developer</p>
            </div>
          </div>
        </div>
        <div className="lg:p-8 p-4 bg-primary/20 w-[600px] flex justify-center items-start flex-col rounded-xl">
            <FaQuoteLeft className="w-6 h-6"/>
          <p className="mb-4 text-lg mt-4">
          I had a fantastic experience on this platform! The
quality of professionals available here is
impressive. I found a skilled web developer who
delivered exceptional work within my budget. The
decentralized nature of the website ensures
transparency and security. A great place to find
talented freelancers.
          </p>
          <div className="flex items-center">
            <img
              alt="Sakshi Mehra"
              className="rounded-full mr-4 mix-blend-screen"
              height="50"
              src={"https://static.vecteezy.com/system/resources/previews/024/293/032/non_2x/illustration-of-user-icon-in-gray-color-vector.jpg"}
              style={{
                aspectRatio: '50/50',
                objectFit: 'cover',
              }}
              width="50"
            />
            <div>
              <p className="font-semibold">Samyak Verma</p>
              <p className="text-sm">Businessman</p>
            </div>
          </div>
        </div>
      </ReactSimplyCarousel>
    </section>
  )
}
