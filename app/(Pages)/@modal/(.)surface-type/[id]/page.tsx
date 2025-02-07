import BackButton from "@/app/(Pages)/_components/BackButton";
import Modal from "@/app/(Pages)/_components/Modal";
import NavButtons from "@/app/(Pages)/_components/NavButtons";
import SurfaceTypeSlider from "@/app/(Pages)/_components/SurfaceTypeSlider";
import TextBlock from "@/app/(Pages)/_components/TextBlock";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALLSURFACETYPES_QUERY, SURFACESBYTYPE_QUERY, SURFACETYPEBYID_QUERY } from "@/sanity/queries/surfaceQueries";
import { QueryParams } from "next-sanity";
import Image from "next/image";

export async function generateStaticParams() {
  const surfaceTypes = await client.fetch(
    ALLSURFACETYPES_QUERY,
    {},
    { perspective: "published" }
  );

  return surfaceTypes.map((surfaceType) => ({
    id: surfaceType?._id,
  }));
}

export default async function Page(props: { params: Promise<QueryParams> }) {

  const params = await props.params;
  const id = params.id as string || ""

  const surfaceType = await sanityFetch({
    query: SURFACETYPEBYID_QUERY,
    params,
  });
  if (!surfaceType) {
    return null;
  }

  const surfaces = await sanityFetch({
    query: SURFACESBYTYPE_QUERY,
    params,
  })
  const surfaceTypesArray = await sanityFetch({
    query: ALLSURFACETYPES_QUERY,
    params: {}
  });

  const currentIndex = surfaceTypesArray.findIndex(surface => surface._id === id);

  const nextIndex = currentIndex === -1 ? -1 : (surfaceTypesArray && currentIndex === surfaceTypesArray.length - 1 ? 0 : currentIndex + 1);

  const previousIndex = currentIndex === -1 ? -1 : (surfaceTypesArray && currentIndex == 0 ? surfaceTypesArray.length - 1 : currentIndex - 1);

  const prevId = surfaceTypesArray[previousIndex]?._id && surfaceTypesArray[previousIndex]._id || surfaceTypesArray[surfaceTypesArray.length - 1]?._id;
  const nextId = surfaceTypesArray[nextIndex]?._id && surfaceTypesArray[nextIndex]._id || surfaceTypesArray[0]?._id;

  return (
    <Modal>
      <article className="relative no-scrollbar bg-light-dark z-10 gap-2 md:gap-10 p-3 sm:p-5 md:p-8 flex flex-col w-full rounded-2xl max-h-[90vh] overflow-y-scroll">
        <NavButtons className="hidden lg:block" backLink={prevId && `/surface-type/${prevId}`} nextLink={nextId && `/surface-type/${nextId}`} />
        <div className="flex flex-col lg:flex-row gap-2 md:gap-10">
          <div className="relative w-full">
            <NavButtons className="lg:hidden" backLink={prevId && `/surface-type/${prevId}`} nextLink={nextId && `/surface-type/${nextId}`} />
            <Image className="w-full object-cover rounded-lg h-40 lg:h-auto" src={urlFor(surfaceType.imageObject).width(800).height(400).format('webp').url()} alt={surfaceType.imageObject.alt} width={800} height={400} />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <h2>{surfaceType.title}</h2>
            <BackButton />
            <section className="w-full min-h-1 flex-shrink overflow-y-scroll no-scrollbar">
              <TextBlock value={surfaceType.description} />
            </section>
          </div>
        </div>

        <SurfaceTypeSlider content={surfaces} surfaceType={params.id} />
      </article>
    </Modal>
  )
}