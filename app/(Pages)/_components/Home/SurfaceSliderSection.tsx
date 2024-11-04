import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import SurfaceSlider from "../SurfaceSlider"

type TProps = {
  content: Extract<
  NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
  { _type: "surfaceSliderSection" }
>
}

const SurfaceSliderSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light-dark">
      <div className="flex flex-col w-full gap-4 max-w-screen-xl items-center">
          <div className="flex flex-col gap-0.5">
            <h2>{content.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{content.sectionName}</h6>
            </div>
          <p>{content.sectionDescription}</p>
          </div> 
          <SurfaceSlider content={content.surfaceList} />
      </div>
    </section>
  )
}

export default SurfaceSliderSection