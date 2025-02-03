import { client, sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SURFACE_QUERY, SURFACES_QUERY } from "@/sanity/queries/surfaceQueries";
import Image from "next/image";
import { QueryParams } from "sanity";
import Link from "next/link";
import Esquina from "@/app/(Pages)/_components/Esquina";



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

  const surface = await sanityFetch({
    query: SURFACE_QUERY,
    params,
  });
  if(!surface) {
    return null
  }

  return(
    <section className="w-full min-h-[calc(100svh-60px)] flex py-5 md:py-20 default-paddings justify-center z-10">
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
      <article className="h-[80svh] sm:h-[70svh] md:h-[60svh] w-[90vw] max-w-screen-xl p-2 rounded-3xl bg-light relative overflow-hidden">
        <Image className="w-full h-full object-cover rounded-2xl max-w-screen-xl" src={urlFor(surface.imageObject).width(2000).height(1000).format('webp').quality(100).url()} alt={surface.imageObject.alt} width={2000} height={1000}/>
        <div className="max-w-[70%] absolute bottom-2 right-2 bg-light rounded-tl-xl flex flex-col p-2 gap-0.5">
          <h2 className="text-base sm:text-xl">{surface.title}</h2>
          <div className="flex items-center gap-2">
              <div className="w-5 h-[3px] bg-accent1 rounded-full"/>
              <h6 className="text-accent1">{surface.type.title}</h6>
          </div>
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex="f1f4fe"/>
          <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex="f1f4fe"/>
        </div>
      </article>
      </div>
    </section>
  )
}