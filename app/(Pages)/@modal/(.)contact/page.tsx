import { sanityFetch } from '@/sanity/lib/client'
import { CONTACTCARD_QUERY } from '@/sanity/queries/homeQueries'
import React from 'react'
import Modal from '../../_components/Modal'

const Page = async () => {

  const cardContent = await sanityFetch({
    query: CONTACTCARD_QUERY,
  })

  return (
    <Modal>
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
    </Modal>
  )
}

export default Page