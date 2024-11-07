import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import LinkButton from "../LinkButton"
import SurfaceTypeViewer from "./SurfaceTypeViewer"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "servicesSection" }
>
}

const ServicesSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light-dark">
      <div className="flex flex-col lg:flex-row w-full gap-14 items-end max-w-screen-xl">
        <header className="flex flex-col items-center justify-between w-full lg:w-3/5 gap-4">
          <div className="w-full flex flex-col gap-0.5">
            <h5>{content.titleDescription}</h5>
            <h2>{content.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{content.sectionName}</h6>
            </div>
          </div>
          <p>{content.description}</p>
          <SurfaceTypeViewer content={content.primarySurfaces}/>
        </header>
        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="w-full flex justify-end">
            <LinkButton color={content.ctaButton.color} link={content.ctaButton.link} size={content.ctaButton.size} text={content.ctaButton.text}/>
          </div>
          <div className="flex flex-col w-full gap-4">
            <h4>También Realizamos:</h4>
            {content.secondaryServices.map((service, index) => (
              <article className="w-full flex gap-4 p-2 rounded-lg bg-light el-shadow" key={index}>
                <Image className="w-28 aspect-square object-cover rounded-md" src={urlFor(service.imageObject).width(400).height(400).format('webp').url()} alt={service.imageObject.alt} width={400} height={400}/>
                <div className="w-full flex flex-col justify-center gap-1 pr-1 lg:pr-4">
                  <h4>{service.title}</h4>
                  <p className="text-[13px]">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection