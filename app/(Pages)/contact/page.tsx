import { sanityFetch } from '@/sanity/lib/client'
import { CONTACTCARD_QUERY } from '@/sanity/queries/homeQueries'
import { EMAILSENDING_QUERY } from '@/sanity/queries/settingsQueries'
import Link from 'next/link'
import React from 'react'
import ContactCard from '../_components/ContactCard'

const Page = async () => {

  const cardContent = await sanityFetch({
    query: CONTACTCARD_QUERY,
  })

  const adminData = await sanityFetch({
      query: EMAILSENDING_QUERY,
  })

  return (
    <section className="w-full min-h-[calc(100svh-60px)] flex py-5 md:py-20 default-paddings justify-center z-10">
      <div className="flex flex-col gap-1 justify-center items-center max-w-screen-md w-full ">
        <Link className="text-white w-full mb-4 text-lg flex items-center gap-1" href={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          Volver
        </Link>
        <ContactCard className='max-w-screen-sm bg-light w-full' content={cardContent} adminData={adminData} />
    </div>
    </section>
  )
}

export default Page