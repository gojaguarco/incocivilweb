import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SURFACE_QUERY, SURFACES_QUERY, SURFACESBYTYPE_IDS_QUERY } from "@/sanity/queries/surfaceQueries";
import Image from "next/image";
import { QueryParams } from "sanity";
import Modal from "@/app/(Pages)/_components/Modal";
import Esquina from "@/app/(Pages)/_components/Esquina";
import BackButton from "@/app/(Pages)/_components/BackButton";
import NavigationTypeButtons from "@/app/(Pages)/_components/NavigationTypeButtons";



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

  const id = params.id as string || ""

  console.log({id})

  const [surfaceTypeId, surfaceId] = id.split("!");

  console.log({surfaceId, surfaceTypeId})

  const surface = await sanityFetch({
    query: SURFACE_QUERY,
    params: {id: surfaceId},
  });

  const surfacesArray = await sanityFetch({
    query: SURFACESBYTYPE_IDS_QUERY,
    params: {id: surfaceTypeId}
  });

  if(!surface) {
    return null
  }

  return(
    <Modal>
      <article className="h-[80svh] sm:h-[70svh] md:h-[60svh] w-[50%] max-w-screen-xl p-2 rounded-3xl bg-light relative overflow-hidden">
        <NavigationTypeButtons currentId={surfaceId} idArray={surfacesArray as string[]} surfaceTypeId={surfaceTypeId} />
        <Image className="w-full h-full object-cover rounded-2xl max-w-screen-xl" src={urlFor(surface.imageObject).width(2000).height(1000).format('webp').quality(100).url()} alt={surface.imageObject.alt} width={2000} height={1000}/>
        <div className="max-w-[70%] absolute bottom-2 right-2 bg-light rounded-tl-xl flex flex-col p-2 gap-0.5">
          <h2 className="text-base sm:text-xl">{surface.title}</h2>
          <div className="flex items-center gap-2">
              <div className="w-5 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{surface.type.title}</h6>
          </div>
          <BackButton />
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex="f1f4fe"/>
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex="f1f4fe"/>
        </div>
      </article>
    </Modal>
  )
}