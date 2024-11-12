import { client, sanityFetch } from "@/sanity/lib/client";
import { SERVICE_QUERY, SERVICES_QUERY } from "@/sanity/queries/serviceQueries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { QueryParams } from "sanity";
import ImageOrVideo from "../../_components/ImageOrVideo";
import LinkButton from "../../_components/LinkButton";



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
      <div className="flex flex-col max-w-screen-md">
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