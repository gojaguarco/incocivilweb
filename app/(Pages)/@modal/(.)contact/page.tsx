import { sanityFetch } from '@/sanity/lib/client'
import { CONTACTCARD_QUERY } from '@/sanity/queries/homeQueries'
import React from 'react'
import Modal from '../../_components/Modal'
import ContactCard from '../../_components/ContactCard'
import { EMAILSENDING_QUERY } from '@/sanity/queries/settingsQueries'

const Page = async () => {

  const cardContent = await sanityFetch({
    query: CONTACTCARD_QUERY,
  })

  const adminData = await sanityFetch({
        query: EMAILSENDING_QUERY,
  })

  return (
    <Modal>
        <ContactCard className='max-w-screen-sm bg-light w-full' content={cardContent} adminData={adminData} />
    </Modal>
  )
}

export default Page