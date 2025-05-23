import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  HOMESURFACEIDS_QUERY,
  SURFACE_QUERY,
  SURFACES_QUERY,
} from "@/sanity/queries/surfaceQueries";
import Image from "next/image";
import { QueryParams } from "sanity";
import Modal from "@/app/(Pages)/_components/Modal";
import Esquina from "@/app/(Pages)/_components/Esquina";
import BackButton from "@/app/(Pages)/_components/BackButton";
import NavButtons from "@/app/(Pages)/_components/NavButtons";

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

  const surfaceId = (params.id as string) || "";

  const surface = await sanityFetch({
    query: SURFACE_QUERY,
    params,
  });
  // id de la superficie
  // origen del click
  // id del tipo de superficie opcional
  const surfacesArray = await sanityFetch({
    query: HOMESURFACEIDS_QUERY,
  });

  if (!surface) {
    return null;
  }

  const currentIndex = surfacesArray ? surfacesArray.indexOf(surfaceId) : -1;

  const nextIndex = () => {
    if (surfacesArray && currentIndex === surfacesArray.length - 1) {
      return 0;
    } else {
      return currentIndex + 1;
    }
  };

  const previousIndex = () => {
    if (surfacesArray && currentIndex == 0) {
      return surfacesArray.length - 1;
    } else {
      return currentIndex - 1;
    }
  };

  return (
    <Modal>
      <article className="h-[80svh] sm:h-[70svh] md:h-[60svh] w-[90vw] max-w-screen-xl p-2 rounded-3xl bg-light relative overflow-hidden">
        {surfacesArray && (
          <NavButtons
            backLink={`/surface/${surfacesArray[previousIndex()]}`}
            nextLink={`/surface/${surfacesArray[nextIndex()]}`}
          />
        )}
        {surface.imageObject && (
          <Image
            className="w-full h-full object-cover rounded-2xl max-w-screen-xl"
            src={urlFor(surface.imageObject)
              .width(2000)
              .height(1000)
              .format("webp")
              .quality(100)
              .url()}
            alt={surface.imageObject.alt}
            width={2000}
            height={1000}
          />
        )}
        <div className="max-w-[70%] absolute bottom-2 right-2 bg-light rounded-tl-xl flex flex-col p-2 gap-0.5">
          <h2 className="text-base sm:text-xl">{surface.title}</h2>
          <div className="flex items-center gap-2">
            <div className="w-5 h-[3px] bg-accent1 rounded-full" />
            <h6 className="text-accent1">{surface.type.title}</h6>
          </div>
          <BackButton />
          <Esquina
            className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0"
            colorHex="f1f4fe"
          />
          <Esquina
            className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0"
            colorHex="f1f4fe"
          />
        </div>
      </article>
    </Modal>
  );
}
