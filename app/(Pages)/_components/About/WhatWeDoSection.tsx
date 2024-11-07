import { ABOUTPAGE_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import LinkButton from "../LinkButton"


type TProps = {
  content: Extract<
  NonNullable<ABOUTPAGE_QUERYResult>["aboutPage"][number],
  { _type: "whatwedoSection" }
>
}

const WhatWeDoSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light">
      <div className="flex flex-col lg:flex-row w-full gap-14 lg:items-center max-w-screen-xl">
        <section className="w-full lg:w-1/2 h-72 relative">
          <Image className="absolute rounded-2xl w-64 aspect-video object-cover el-shadow" src={urlFor(content.imageArray[0] || "").width(600).height(350).url()} alt={content.imageArray[0].alt} width={600} height={350} />
          <Image className="absolute rounded-2xl w-72 aspect-video object-cover el-shadow bottom-0 left-1/2 -translate-x-1/2" src={urlFor(content.imageArray[1] || "").width(600).height(350).url()} alt={content.imageArray[1].alt} width={600} height={350} />
          <Image className="absolute right-0 rounded-2xl w-64 aspect-video object-cover el-shadow" src={urlFor(content.imageArray[2] || "").width(600).height(350).url()} alt={content.imageArray[2].alt} width={600} height={350} />
        </section>
        <section className="w-full lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-slate-800 text-2xl">{content.title}</h2>
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