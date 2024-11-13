import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import Faq from "./Faq"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "faqSection" }
>
}

const FaqSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light">
      <div className="flex flex-col lg:flex-row w-full gap-14 max-w-screen-xl">
        <header className="w-full lg:w-3/5">
          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{content.sectionName}</h6>
            </div>
            <h2>{content.title}</h2>
            <p className="mt-2">{content.sectionDescription}</p>
          </div>
          <section className="w-full flex flex-col gap-2.5">
          { content.faqs.map((faq, index) => (
          <Faq key={index} faq={faq}/>
          ))}
          </section>
        </header>
        <Image className={"w-full lg:w-2/5 aspect-video lg:aspect-video rounded-xl object-cover max-h-[500px]"} src={urlFor(content.imageObject).width(600).height(600).format('webp').url()} alt={content.imageObject.alt} width={600} height={600} />
      </div>
    </section>
  )
}

export default FaqSection