import { PROJECTS_QUERYResult } from "@/sanity.types"
import LinkButton from "../../_components/LinkButton"
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Esquina from "../../_components/Esquina";


type TProps = {
  content: Extract<
  NonNullable<PROJECTS_QUERYResult>["projectsPage"][number],
  { _type: "projectSection" }>;
  bg: string;
  first?: boolean;
}

const ProjectSection = ({content, bg, first}: TProps) => {
  return (
    <section className={`flex justify-center ${!first && bg} w-full py-14 lg:py-20 overflow-hidden default-paddings`}>
      <div className="max-w-screen-xl flex flex-col w-full items-center gap-8">
        <header className="flex justify-between w-full">
          <div className={`flex flex-col ${first ? 'text-light' : 'text-primary'}`}>
            <h5 className="text-sm sm:text-base md:text-lg font-thin tracking-[3px]">{content.titleDescription}</h5>
            <h2 className="text-xl md:text-2xl font-semibold mt-1">{content.title}</h2>
          </div>
          <div className="hidden lg:flex h-fit">
            <LinkButton color={content.ctaButton1.color} link={content.ctaButton1.link} size={content.ctaButton1.size} text={content.ctaButton1.text} />
          </div>
        </header>
        <section className="w-full overflow-x-scroll no-scrollbar p-2">
          <ul className="flex gap-6">
            {content.projects.map((project, index) => (
              <Link className={`p-2 ${first ? 'bg-primary' : 'bg-light'} rounded-2xl relative flex items-center justify-center h-48 w-64 lg:h-56 lg:w-80 el-shadow group flex-shrink-0`} href={`/projects/${project._id}`} key={index}>
                <Image className="rounded-xl w-full h-full object-cover" src={urlFor(project.image).width(500).height(500).format('webp').url()} alt={project.image.alt} width={500} height={500}/>
                <div className={`absolute bottom-2 right-2 ${first ? 'bg-primary' : 'bg-light'} rounded-tl-xl flex px-2 py-1 items-center gap-1`}>
                  <div className="w-4 h-4 rounded-full bg-accent1 group-hover:rotate-90 transition-all flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 -rotate-45" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />  
                    <path d="M12 5l0 14" />
                    <path d="M18 11l-6 -6" />
                    <path d="M6 11l6 -6" />
                  </svg>
                  </div>
                  <h6 className={`${first ? 'text-light' : 'text-slate-700'}  group-hover:underline underline-offset-2`}>{project.title}</h6>
                  <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex={`${first ? '363942' : 'f1f4fe'}`}/>
                  <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex={`${first ? '363942' : 'f1f4fe'}`}/>
                </div>
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default ProjectSection