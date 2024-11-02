import { QueryParams } from "next-sanity";

import { BLOGS_QUERY, BLOG_QUERY } from "@/sanity/queries/blogQueries";

import { client, sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/app/(Pages)/_components/Post";

export async function generateStaticParams() {
  const posts = await client.fetch(
    BLOGS_QUERY,
    {},
    { perspective: "published" }
  );

  return posts.map((post) => ({
    id: post?._id,
  }));
}

export default async function Page(props: { params: Promise<QueryParams> }) {
  const params = await props.params;
  const post = await sanityFetch({
    query: BLOG_QUERY,
    params,
  });
  if (!post) {
    return (<>oli</>);
  }
  return <Post post={post} />;
}