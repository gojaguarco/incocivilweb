import { sanityFetch } from "@/sanity/lib/client"
import { PROJECTS_QUERY } from "@/sanity/queries/projectQueries"
import ProjectSection from "./_components/ProjectSection"
import ProjectContactSection from "./_components/ProjectContactSection"



const Page = async () => {

  const projectsContent = await sanityFetch({
    query: PROJECTS_QUERY,
  })
  return (
    <>
      {projectsContent?.projectsPage.map((section, index) => (
        <section key={index} className="relative w-full flex flex-col items-center">
          {section._type == 'projectSection' && (
            <ProjectSection bg={index % 2 === 0 ? 'bg-light' : 'bg-light-dark'} content={section} first={index === 0 ? true : false}/>
          )}
          {/* {section._type == 'projectContactSection' && (
            <ProjectContactSection content={section} />
          )} */}
        </section>
      ))}
    </>
  )
}

export default Page