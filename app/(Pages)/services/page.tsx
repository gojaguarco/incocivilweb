import { sanityFetch } from "@/sanity/lib/client"
import { SERVICES_QUERY } from "@/sanity/queries/serviceQueries"
import ServiceImageSection from "./_components/ServiceImageSection"



const page = async () => {

  const services = await sanityFetch({
    query: SERVICES_QUERY,
  })

  return (
    <section className="w-full flex flex-col">
      {services.map((service, index) => (
          <ServiceImageSection service={service} bg={index % 2 === 0 ? 'bg-light' : 'bg-light-dark'} inverse={index % 2 === 0 ? true : false} key={index} />
        ))}
    </section>
  )
}

export default page