import { Posts } from "@/app/(Pages)/_components/Posts";
import { sanityFetch } from "@/sanity/lib/client";
import { BLOGS_QUERY } from "@/sanity/queries/blogQueries";

export default async function Page() {

  const posts = await sanityFetch({
    query: BLOGS_QUERY,
  });

  return (
    <section className="w-full min-h-screen bg-primary flex justify-center default-paddings z-10 py-14 lg:py-20 text-light">
      <div className="w-full flex flex-col max-w-screen-xl gap-10">
        <header className="flex flex-col gap-0.5">
          <h2 className="text-2xl md:text-4xl font-semibold mt-1">Blog del Experto</h2>
          <h5 className="text-sm sm:text-base font-thin tracking-[3px] uppercase">Consejos, noticias, novedades, ideas y más</h5>
        </header>
        <Posts posts={posts} />
      </div>
    </section>
  );
}
