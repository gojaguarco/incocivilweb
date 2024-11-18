import { client, sanityFetch } from "@/sanity/lib/client";
import { SERVICE_QUERY, SERVICES_QUERY } from "@/sanity/queries/serviceQueries";
import { PortableText } from "next-sanity";
import { QueryParams } from "sanity";
import ImageOrVideo from "../../_components/ImageOrVideo";
import LinkButton from "../../_components/LinkButton";
import Link from "next/link";



export async function generateStaticParams() {
  const services = await client.fetch(
    SERVICES_QUERY,
    {},
    { perspective: "published" }
  );
  return services.map((service) => ({
    id: service?._id,
  }))
}

export default async function Page(props: { params: Promise<QueryParams> }) {

  const params = await props.params;

  const service = await sanityFetch({
    query: SERVICE_QUERY,
    params,
  });
  if(!service){
    return null
  }

  return(
    <section className="w-full min-h-[calc(100svh-60px)] flex justify-center py-8 md:py-20 default-paddings bg-light-dark z-10">
      <div className="w-full flex flex-col max-w-screen-md gap-6">
        <Link className="w-full mb-4 text-lg flex items-center gap-1" href={'/services'}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          Volver
        </Link>
        <h1>{service.title}</h1>
        <ImageOrVideo className="aspect-video object-cover my-8" content={service.ImageOrVideo} />
        <PortableText value={service.body}/>
        <div className="w-full mt-8">
        <LinkButton color="claro" size="mediano" link="/services" text="Todos los Servicios" />
        </div>
      </div>
    </section>
  )
}