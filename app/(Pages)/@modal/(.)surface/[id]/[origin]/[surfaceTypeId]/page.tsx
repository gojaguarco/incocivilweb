import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CATALOGUE_SURFACES_IDS_QUERY, HOMESURFACEIDS_QUERY, SURFACE_QUERY, SURFACES_QUERY, SURFACESBYTYPE_IDS_QUERY } from "@/sanity/queries/surfaceQueries";
import Image from "next/image";
import { QueryParams } from "sanity";
import Modal from "@/app/(Pages)/_components/Modal";
import Esquina from "@/app/(Pages)/_components/Esquina";
import BackButton from "@/app/(Pages)/_components/BackButton";
import NavButtons from "@/app/(Pages)/_components/NavButtons";
import Availability from "@/app/(Pages)/_components/Availability";



export async function generateStaticParams() {
  const surfaces = await client.fetch(
    SURFACES_QUERY,
    {},
    { perspective: "published" }
  );

  return surfaces.map((surface) => ({
    id: surface?._id,
  }));
}

export default async function Page(props: { params: Promise<QueryParams> }) {

  const params = await props.params;

  const surfaceId = params.id as string || "";
  const origin = params.origin as "homepage" | "surfaceType" | "catalogue" || "";
  const surfaceTypeId = params.surfaceTypeId as string || "";
  // origin = homepage
  // origin = surfacetype
  // origin = catalogo

  // cambia el array de la navegacio el surfaces array
  // si homepage es el default
  // si origen es surfacetype y surfacetype id es diferente a 0 hay q traer el array de surfaces type  const surfacesArrayBySurfaceType = 
  // si viene del catalogo hay q traer el array de q se usa en el catalogo 


  const surface = await sanityFetch({
    query: SURFACE_QUERY,
    params,
  });
  // id de la superficie
  // origen del click
  // id del tipo de superficie opcional 


  const surfacesArray = origin === "homepage" ?
    await sanityFetch({
      query: HOMESURFACEIDS_QUERY,
    })
    : origin === "catalogue" && surfaceTypeId === "0" ?
      await sanityFetch({
        query: CATALOGUE_SURFACES_IDS_QUERY,
      })
      : await sanityFetch({
        query: SURFACESBYTYPE_IDS_QUERY,
        params: { id: surfaceTypeId }
      })
  // origin === "catalogue" && surfaceTypeId !== "0" ?   
  // origin === "surfaceType" && surfaceTypeId !== "0" && surfaceTypeId.length > 1 ?

  if (!surface) {
    return null
  }

  const currentIndex = surfacesArray ? surfacesArray.indexOf(surfaceId) : -1;

  const nextIndex = () => {
    if (surfacesArray && currentIndex === surfacesArray.length - 1) {
      return 0
    } else {
      return currentIndex + 1
    }
  }

  const previousIndex = () => {
    if (surfacesArray && currentIndex == 0) {
      return surfacesArray.length - 1
    } else {
      return currentIndex - 1
    }
  }

  const backUrl = origin === "catalogue" && surfaceTypeId !== "0" ? `/catalogo?surfaceType=${surfaceTypeId}` : "/catalogo"

  return (
    <Modal backUrl={backUrl}>
      <article className="h-[80svh] sm:h-[70svh] md:h-[60svh] w-[90vw] max-w-screen-xl p-2 rounded-3xl bg-light relative overflow-hidden">
        {surfacesArray && <NavButtons backLink={`/surface/${surfacesArray[previousIndex()]}/${origin}/${surfaceTypeId ?? "0"}`} nextLink={`/surface/${surfacesArray[nextIndex()]}/${origin}/${surfaceTypeId ?? "0"}`} />}
        <Image className="w-full h-full object-cover rounded-2xl max-w-screen-xl" src={urlFor(surface.imageObject).width(2000).height(1000).format('webp').quality(100).url()} alt={surface.imageObject.alt} width={2000} height={1000} />
        <div className="max-w-[70%] absolute bottom-2 right-2 bg-light rounded-tl-xl flex flex-col p-2 gap-0.5">
          <h2 className="text-base sm:text-xl">{surface.title}</h2>
          <div className="flex flex-col">

            <div className="flex items-center gap-2">
              <div className="w-5 h-[3px] bg-accent1 rounded-full" />
              <h6 className="text-accent1">{surface.type.title}</h6>
            </div>
            <Availability
              availability={surface.availability}
              surfaceId={surface._id}
              surfaceTypeId={surface.type._id}
            />
          </div>
          <BackButton url={backUrl} />
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex="f1f4fe" />
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex="f1f4fe" />
        </div>
      </article>
    </Modal>
  )
}