import { ABOUTPAGE_QUERYResult } from "@/sanity.types"

type TProps = {
  content: Extract<
  NonNullable<ABOUTPAGE_QUERYResult>["aboutPage"][number],
  { _type: "aboutHeroSection" }
>
}

const AboutHeroSection = ({content}: TProps) => {
  return (
    <section className="flex justify-center relative w-full py-20 overflow-hidden default-paddings bg-light">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-14 items-end max-w-screen-xl">

      </div>
    </section>
  )
}

export default AboutHeroSection