import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

type TProps = {
  content: Extract<
    NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
    { _type: "surfaceSliderSection" }
  >['surfaceList']
}

const SurfaceSlider = ({content}: TProps) => {

  return (
    <section className="flex w-full pt-5 h-64 gap-2 make-3d items-center justify-center">
      {content.map((surface, index) => (
        <article 
        className={`surface-object h-full flex items-center justify-center`} key={index}>
          <Image className="w-full h-full object-cover rounded-xl" src={urlFor(surface.imageObject).width(600).height(600).format('webp').url()} alt={surface.imageObject.alt} width={600} height={600}/>
        </article>
      ))}
    </section>
  )
}

export default SurfaceSlider