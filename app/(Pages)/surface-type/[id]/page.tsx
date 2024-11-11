import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SURFACESBYTYPE_QUERY, SURFACETYPE_QUERY, SURFACETYPES_QUERY } from "@/sanity/queries/surfaceQueries";
import { PortableText, QueryParams } from "next-sanity";
import Image from "next/image";
import SurfaceSlider from "../../_components/SurfaceSlider";



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
    return (<>oli</>);
  }

  const surfaces = await sanityFetch({
    query: SURFACESBYTYPE_QUERY,
    params,
  })


  return (
  <section className="w-full min-h-[calc(100svh-60px)] flex py-20 default-paddings justify-center">
    <article className="bg-light-dark z-10 gap-10 max-w-screen-xl p-5 xs:p-8 flex flex-col w-full h-full rounded-2xl">
    <div className="flex flex-col lg:flex-row gap-10">
    <Image className="w-full lg:w-1/2 object-cover rounded-lg" src={urlFor(surfaceType.imageObject).width(800).height(400).format('webp').url()} alt={surfaceType.imageObject.alt} width={800} height={400}/>
    <div className="flex flex-col gap-4 w-full lg:w-1/2">
      <h2>{surfaceType.title}</h2>
      <PortableText value={surfaceType.description}/>
    </div>
    </div>

    <SurfaceSlider content={surfaces} />
    </article>


  </section>
  )}