import { ABOUTPAGE_QUERYResult } from "@/sanity.types"
import Image from "next/image"
import ImageOrVideo from "../ImageOrVideo"

type TProps = {
  content: Extract<
  NonNullable<ABOUTPAGE_QUERYResult>["aboutPage"][number],
  { _type: "aboutHeroSection" }
>
}

const AboutHeroSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-14 lg:py-20 overflow-hidden default-paddings ">
      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-14 lg:items-center max-w-screen-xl">
        <header className="flex flex-col text-light w-full lg:w-1/2">
          <h5 className="text-sm sm:text-base md:text-lg font-thin tracking-[3px]">{content.titleDescription}</h5>
          <h2 className="text-xl md:text-2xl font-semibold mt-1">{content.title1}</h2>
          <div className="flex items-center gap-1 md:gap-3 mt-2">
            <h4 className="text-sm sm:text-base md:text-lg text-nowrap">{content.title2}</h4>
            <h2 className="text-xl sm:text-2xl px-2 py-0.5 md:px-4 md:py-1.5 bg-accent2 rounded-lg text-slate-800">{content.highlightedTitle}</h2>
          </div>
          <p className="mt-6 text-slate-300">{content.descriptionText}</p>
        </header>
        <ImageOrVideo className="w-full lg:w-1/2 aspect-video el-shadow" content={content.ImageOrVideo}></ImageOrVideo>
      </div>
    </section>
  )
}

export default AboutHeroSection