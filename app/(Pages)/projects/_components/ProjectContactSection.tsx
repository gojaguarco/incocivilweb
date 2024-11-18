import { PROJECTS_QUERYResult } from "@/sanity.types"


type TProps = {
  content: Extract<
  NonNullable<PROJECTS_QUERYResult>["projectsPage"][number],
  { _type: "projectContactSection" }
>
}

const ProjectContactSection = ({content}: TProps) => {
  return (
    <section>
      
    </section>
  )
}

export default ProjectContactSection