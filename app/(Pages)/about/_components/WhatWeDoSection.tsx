import { ABOUTPAGE_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import LinkButton from "../../_components/LinkButton"


type TProps = {
  content: Extract<
  NonNullable<ABOUTPAGE_QUERYResult>["aboutPage"][number],
  { _type: "whatwedoSection" }
>
}

const WhatWeDoSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-14 lg:py-20 overflow-hidden default-paddings bg-light">
      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-14 lg:items-center max-w-screen-xl">
        <section className="w-full lg:w-1/2 xl:w-3/5 h-[400px] md:h-80 lg:h-96 xl:h-[300px] relative">
          <Image className="absolute rounded-2xl w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 aspect-video object-cover el-shadow" src={urlFor(content.imageArray[0]).width(600).height(350).format('webp').url()} alt={content.imageArray[0].alt} width={600} height={350} />
          <Image className="absolute rounded-2xl w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 aspect-video object-cover el-shadow bottom-0 left-0 xs:left-8 sm:left-[15%] md:left-1/2 md:-translate-x-1/2" src={urlFor(content.imageArray[1]).width(600).height(350).format('webp').url()} alt={content.imageArray[1].alt} width={600} height={350} />
          <Image className="absolute top-1/2 -translate-y-1/2 md:top-10 md:translate-y-0 lg:top-1/2 lg:-translate-y-1/2 xl:top-12 xl:translate-y-0 right-0 rounded-2xl w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 aspect-video object-cover el-shadow" src={urlFor(content.imageArray[2]).width(600).height(350).format('webp').url()} alt={content.imageArray[2].alt} width={600} height={350} />
        </section>
        <section className="w-full lg:w-1/2 xl:w-2/5 flex flex-col gap-4">
          <h2 className="text-slate-800 text-xl sm:text-2xl">{content.title}</h2>
          <p>{content.descriptionText}</p>
          <div className="flex justify-end">
            <LinkButton color={content.ctaButton.color} link={content.ctaButton.link} size={content.ctaButton.size} text={content.ctaButton.text}/>
          </div>
        </section>
      </div>
    </section>
  )
}

export default WhatWeDoSection