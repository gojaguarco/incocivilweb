import { SERVICE_QUERYResult } from "@/sanity.types"
import LinkButton from "../../_components/LinkButton"
import ImageOrVideo from "../../_components/ImageOrVideo"


type TProps = {
  service: Extract<
  NonNullable<SERVICE_QUERYResult>,
  {}
>,
  inverse?: boolean;
  bg: string;
}

const ServiceImageSection = ({service, inverse, bg}: TProps) => {
  return (
      <section className={`flex justify-center relative w-full py-14 lg:py-20 overflow-hidden default-paddings ${bg}`}>
        <div className={`flex flex-col ${inverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full gap-8 lg:gap-14 lg:items-center max-w-screen-xl`}>
        <section className="w-full lg:w-1/2 flex flex-col gap-5">
            <h2 className="text-slate-800 text-xl sm:text-2xl">{service.title}</h2>
            <p>{service.descriptionText}</p>
            <div className="flex gap-3">
              <LinkButton color={'oscuro'} link={`/service/${service._id}`} size={'mediano'} text={'Ver Servicio'}/>
            </div>
          </section>
          <ImageOrVideo className="w-full lg:w-1/2 aspect-video object-cover" content={service.ImageOrVideo} />
        </div>
      </section>
  )
}

export default ServiceImageSection