import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SURFACESBYTYPE_QUERY, SURFACETYPE_QUERY, SURFACETYPES_QUERY } from "@/sanity/queries/surfaceQueries";
import { PortableText, QueryParams } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import SurfaceTypeSlider from "../../_components/SurfaceTypeSlider";



export async function generateStaticParams() {
  const surfaceTypes = await client.fetch(
    SURFACETYPES_QUERY,
    {},
    { perspective: "published" }
  );

  return surfaceTypes.map((surfaceType) => ({
    id: surfaceType?._id,
  }));
}

export default async function Page(props: { params: Promise<QueryParams> }) {

  const params = await props.params;
  const surfaceType = await sanityFetch({
    query: SURFACETYPE_QUERY,
    params,
  });
  if (!surfaceType) {
    return null;
  }

  const surfaces = await sanityFetch({
    query: SURFACESBYTYPE_QUERY,
    params,
  })


  return (
  <section className="w-full min-h-[calc(100svh-60px)] flex gap-1 py-5 justify-center md:py-20 default-paddings z-10">
    <div className="flex flex-col gap-1 justify-center max-w-screen-xl w-full ">
    <Link className="text-white w-full mb-4 text-lg flex items-center gap-1" href={'/'}>
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        Volver
      </Link>
    <article className="bg-light-dark gap-2 md:gap-10 max-w-screen-xl p-3 sm:p-8 flex flex-col w-full h-full rounded-2xl">
    <div className="flex flex-col lg:flex-row gap-2 md:gap-10">
    <Image className="w-full lg:w-1/2 object-cover rounded-lg h-40 sm:h-auto" src={urlFor(surfaceType.imageObject).width(800).height(400).format('webp').url()} alt={surfaceType.imageObject.alt} width={800} height={400}/>
    <div className="flex flex-col gap-4 w-full lg:w-1/2">
      <h2>{surfaceType.title}</h2>
      <PortableText value={surfaceType.description}/>
    </div>
    </div>

    <SurfaceTypeSlider content={surfaces} surfaceType={params.id} />
    </article>
    </div>

  </section>
  )}