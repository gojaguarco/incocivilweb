import { sanityFetch } from '@/sanity/lib/client'
import { CONTACTCARD_QUERY } from '@/sanity/queries/homeQueries'
import Link from 'next/link'
import React from 'react'

const Page = async () => {

  const cardContent = await sanityFetch({
    query: CONTACTCARD_QUERY,
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
        <form className={`flex flex-col gap-2 rounded-xl py-7 px-6 el-shado justify-center el-shadow max-w-screen-sm bg-light w-full`}>
        <div>
          <h2 className="text-2xl">{cardContent?.title}</h2>
          <p>{cardContent?.description}</p>
        </div>
          <div>
            <label className="text-gray-900">Nombre Completo:</label>
            <input type="text" id="name" autoComplete="name" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="Juan Pérez" required />
          </div>
          <div>
            <label className="text-gray-900">Email:</label>
            <input type="email" id="email" autoComplete="email" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="tunombre@incocivil.com" required />
          </div>
          <div>
            <label className="text-gray-900">Teléfono:</label>
            <input type="tel" id="tel" autoComplete="tel" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="300 123 4567" required />
          </div>
          <div>
            <label className="text-gray-900">Mensaje:</label>
            <textarea id="message" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full min-h-20 py-2 px-3" placeholder="Deja tu mensaje..." required />
          </div>
          <div className="flex w-full justify-end pt-3">
          <button className="px-8 py-2 rounded-lg text-sm text-nowrap flex-shrink-0 bg-accent1 text-slate-100 font-light hover:underline underline-offset-2 hover:-translate-y-0.5 hover:el-shadow" type="submit">{cardContent?.ctaButton.text}</button>
          </div>
      </form>
    </div>
    </section>
  )
}

export default Page