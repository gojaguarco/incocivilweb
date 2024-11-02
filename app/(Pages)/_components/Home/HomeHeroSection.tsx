import { HOMEPAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Esquina from "../Esquina";
import LinkButton from "../LinkButton";

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "homeHeroSection" }
>
}

const HomeHeroSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-16 lg:py-32 overflow-hidden default-paddings">
      <div className="flex flex-col lg:flex-row w-full gap-14 items-end max-w-screen-xl">
        <div className="flex flex-col w-full lg:w-1/2 gap-12">
          <header className="flex flex-col text-light-dark header-text gap-1">
            <h1 className="text-nowrap">{content.simpleTitle}</h1>
            <h1 className="px-5 py-2 bg-accent2 text-primary rounded-xl tracking-[7px] w-fit text-nowrap font-black">{content.highlightedTitle}</h1>
          </header>
          <section className="flex flex-col gap-3 px-5 py-4 bg-accent2 rounded-2xl">
            <div className="flex gap-4 items-end">
              <h2>{content.descriptionCard.projectNumber}+</h2>
              <h3>{content.descriptionCard.descriptionTitle}</h3>
            </div>
            <div className="border-b border-primary w-full "/>
            <p className="text-lg">{content.descriptionCard.descriptionText}</p>
            <div className="flex w-full justify-end gap-6 mt-3">
              <LinkButton color={content.descriptionCard.primaryButton.color} link={content.descriptionCard.primaryButton.link} size={content.descriptionCard.primaryButton.size} text={content.descriptionCard.primaryButton.text} />
              <LinkButton color={content.descriptionCard.secondaryButton.color} link={content.descriptionCard.secondaryButton.link} size={content.descriptionCard.secondaryButton.size} text={content.descriptionCard.secondaryButton.text} />
            </div>
          </section>
        </div>
        <div className="relative flex w-full lg:w-1/2 bg-light-dark rounded-2xl p-2 max-h-96 overflow-hidden">
          <Image className="w-full object-cover rounded-xl" src={urlFor(content.expertiseCard.image.asset?._ref || "").width(800).height(800).url()} alt={content.expertiseCard.image.alt} height={800} width={800}/>
          <section className="absolute bottom-0 right-0 px-3 py-3 bg-light-dark rounded-tl-xl text-primary w-1/2 flex flex-col gap-1">
            <Esquina className="absolute -top-3 w-3 h-3 right-2 rotate-90" colorHex='e0e3ec'/>
            <Esquina className="absolute -left-3 w-3 h-3 bottom-2 rotate-90" colorHex='e0e3ec'/>
            <h4 className="text-gray-800">{content.expertiseCard.title}</h4>
            <div className="border-b border-primary w-full "/>
            <p>{content.expertiseCard.description}</p>
            <div className="flex w-full justify-end mt-2">
              <LinkButton color={content.expertiseCard.ctaButton.color} link={content.expertiseCard.ctaButton.link} size={content.expertiseCard.ctaButton.size} text={content.expertiseCard.ctaButton.text} />
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection