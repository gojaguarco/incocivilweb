import { PROJECTS_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import ContactCard from "../../_components/ContactCard"
import { sanityFetch } from "@/sanity/lib/client"
import { EMAILSENDING_QUERY } from "@/sanity/queries/settingsQueries"


type TProps = {
  content: Extract<
  NonNullable<PROJECTS_QUERYResult>["projectsPage"][number],
  { _type: "projectContactSection" }
>;
  bg?: string;
}

const ProjectContactSection = async ({content, bg}: TProps) => {
  
  const adminData = await sanityFetch({
      query: EMAILSENDING_QUERY,
    })
    
  return (
    <section className={`flex justify-center relative w-full py-20 overflow-hidden default-paddings ${bg} `}>
      <div className="flex flex-col lg:flex-row w-full gap-14 max-w-screen-xl">
        <header className="w-full lg:w-1/2 flex flex-col">
          <h5 className="text-sm sm:text-base md:text-lg font-thin ">{content.titleDescription}</h5>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">{content.title}</h2>
          <Image className="object-cover w-full rounded-xl h-72" src={urlFor(content.imageObject).width(800).height(400).format('webp').url()} alt={content.imageObject.alt} width={800} height={400}/>
        </header>
        <ContactCard className="w-full lg:w-1/2 bg-light" content={content.contactCard} adminData={adminData}/>
      </div>
    </section>
  )
}

export default ProjectContactSection