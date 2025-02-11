import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { BLOG_QUERY } from "@/sanity/queries/blogQueries";
import { sanityFetch } from "@/sanity/lib/client";
import { QueryParams } from "sanity";
import LinkButton from "../../_components/LinkButton";
import TextBlock from "../../_components/TextBlock";


export default async function Page(props: { params: Promise<QueryParams> }) {

  const params = await props.params;
  const post = await sanityFetch({
    query: BLOG_QUERY,
    params,
  });
  if (!post) {
    return null;
  }

  return (
    <section className="w-full min-h-[calc(100svh-60px)] flex justify-center py-8 md:py-20 default-paddings bg-light-dark z-10">
      <div className="w-full flex flex-col gap-6 max-w-screen-md">
        <Link className="w-full mb-4 text-lg flex items-center gap-1" href={'/blog'}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          Volver
        </Link>
        <h1>{post.title}</h1>
        {post.image.url && <Image className="w-full rounded-2xl max-w-screen-xl" src={urlFor(post.image.url).width(2000).height(1000).format('webp').url()} alt={post.image.alt} width={2000} height={1000} />}
        <TextBlock value={post.body} />
        <div className="w-full mt-8">
          <LinkButton color="claro" size="mediano" link="/blog" text="Todas las Publicaciones" />
        </div>
      </div>
    </section>
  )
}
