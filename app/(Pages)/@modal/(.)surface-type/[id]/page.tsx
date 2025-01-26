import BackButton from "@/app/(Pages)/_components/BackButton";
import Modal from "@/app/(Pages)/_components/Modal";
import SurfaceTypeSlider from "@/app/(Pages)/_components/SurfaceTypeSlider";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SURFACESBYTYPE_QUERY, SURFACETYPE_QUERY, SURFACETYPES_QUERY } from "@/sanity/queries/surfaceQueries";
import { PortableText, QueryParams } from "next-sanity";
import Image from "next/image";

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
  <Modal>
    <article className="bg-light-dark z-10 gap-2 md:gap-10 p-3 sm:p-5 md:p-8 flex flex-col w-full rounded-2xl max-h-[90vh]">
      <div className="flex flex-col lg:flex-row gap-2 md:gap-10">
        <Image className="w-full lg:w-1/2 object-cover rounded-lg h-40 lg:h-auto" src={urlFor(surfaceType.imageObject).width(800).height(400).format('webp').url()} alt={surfaceType.imageObject.alt} width={800} height={400}/>
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <h2>{surfaceType.title}</h2>
          <BackButton />
          <section className="w-full min-h-1 flex-shrink overflow-y-scroll">
            <PortableText value={surfaceType.description}/>
          </section>
        </div>
      </div>

      <SurfaceTypeSlider content={surfaces} surfaceType={params.id} />
    </article>
  </Modal>
  )}