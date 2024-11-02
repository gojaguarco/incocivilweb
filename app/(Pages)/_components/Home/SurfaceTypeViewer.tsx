import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Esquina from "../Esquina"

  type TProps = {
    content: Extract<
    NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
    { _type: "servicesSection" }
  >['primarySurfaces']
  }



const SurfaceTypeViewer = ({content}: TProps) => {

  return (
    <section className="p-2.5 rounded-2xl bg-light w-full flex flex-wrap gap-2.5">
      {content.map((surface, index) => {
        if(index === 0 || index === 3) return(
          <div className="w-2/5 relative" key={index}>
            <Image className="w-full h-full object-cover  rounded-xl" src={urlFor(surface.imageObject.asset || "").width(800).height(400).url()}  alt={surface.imageObject.alt} width={800} height={400} />
            <div className="absolute bottom-0 right-0 bg-light rounded-tl-xl flex px-2 py-0.5 items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-accent1 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 -rotate-45" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />  
                <path d="M12 5l0 14" />
                <path d="M18 11l-6 -6" />
                <path d="M6 11l6 -6" />
              </svg>
              </div>
              <h6 className=" text-slate-700">{surface.title}</h6>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex="f1f4fe"/>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex="f1f4fe"/>
            </div>
          </div>
        ) 
        else return(
          <div className="w-2/5 flex-grow relative" key={index}>
            <Image className="w-full h-full object-cover  rounded-xl" src={urlFor(surface.imageObject.asset || "").width(800).height(400).url()}  alt={surface.imageObject.alt} width={800} height={400} />
            <div className="absolute bottom-0 right-0 bg-light rounded-tl-xl flex px-2 py-0.5 items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-accent1 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 -rotate-45" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />  
                <path d="M12 5l0 14" />
                <path d="M18 11l-6 -6" />
                <path d="M6 11l6 -6" />
              </svg>
              </div>
              <h6 className=" text-slate-700">{surface.title}</h6>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex="f1f4fe"/>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex="f1f4fe"/>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default SurfaceTypeViewer