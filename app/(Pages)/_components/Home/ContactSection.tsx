import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import ContactCard from "../ContactCard"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import LinkButton from "../LinkButton"
import { sanityFetch } from "@/sanity/lib/client"
import { EMAILSENDING_QUERY } from "@/sanity/queries/settingsQueries"

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "contactSection" }
>
}

const ContactSection = async ({content}: TProps) => {

  const adminData = await sanityFetch({
    query: EMAILSENDING_QUERY,
  })
  
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light-dark">
      <div className="flex flex-col lg:flex-row w-full gap-14 max-w-screen-xl">
        <header className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{content.sectionName}</h6>
            </div>
            <h2>{content.title}</h2>
          </div>
          <Image className="object-cover w-full rounded-xl h-72" src={urlFor(content.imageObject).width(800).height(400).format('webp').url()} alt={content.imageObject.alt} width={800} height={400}/>
          <div className="flex gap-5">
            <article className="w-1/2 p-4 rounded-xl bg-light flex flex-col items-end gap-3 justify-between el-shadow">
              <p className="w-full text-base font-normal">{content.homeProject.text}</p>
              <LinkButton color={content.homeProject.ctaButton.color} link={content.homeProject.ctaButton.link} size={content.homeProject.ctaButton.size} text={content.homeProject.ctaButton.text} />
            </article>
            <article className="w-1/2 p-4 rounded-xl bg-light flex flex-col items-end gap-3 justify-between el-shadow">
              <p className="w-full text-base font-normal">{content.comercialProject.text}</p>
              <LinkButton color={content.comercialProject.ctaButton.color} link={content.comercialProject.ctaButton.link} size={content.comercialProject.ctaButton.size} text={content.comercialProject.ctaButton.text} />
            </article>
          </div>
        </header>
        <ContactCard className="w-full lg:w-1/2 bg-light" content={content.contactCard} adminData={adminData}/>
      </div>
    </section>
  )
}

export default ContactSection