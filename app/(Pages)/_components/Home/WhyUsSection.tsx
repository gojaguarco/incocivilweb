import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import ImageOrVideo from "../ImageOrVideo"
import LinkButton from "../LinkButton"

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "whyusSection" }
>
}

const WhyUsSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-14 items-end max-w-screen-xl">
        <ImageOrVideo className="w-full lg:w-2/5 h-80 aspect-video object-cover " content={content.ImageOrVideo}/>
        <header className="w-full lg:w-3/5 flex flex-col">
          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{content.sectionName}</h6>
            </div>
            <h2>{content.title}</h2>
          </div>
          {content.benefits.map((benefit, index) => (
            <article className="mb-4" key={index}>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </article>
          ))}
          <div className="flex">
          <LinkButton color={content.ctaButton.color} link={content.ctaButton.link} size={content.ctaButton.size} text={content.ctaButton.text}/>
          </div>
        </header>
      </div>
    </section>
  )
}

export default WhyUsSection