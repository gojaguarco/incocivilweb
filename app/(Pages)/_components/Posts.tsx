import { BLOGS_QUERYResult } from "../../../sanity.types";

export function Posts({ posts }: { posts: BLOGS_QUERYResult }) {
  return (
    <ul className="container mx-auto grid grid-cols-1 divide-y divide-blue-100 animate-wiggle animate-twice animate-duration-200 animate-ease-in-out animate-normal">
      {posts.map((post) => (
        <li key={post._id}>
          <a
            className="block p-4 hover:bg-blue-50"
            href={`/blog/${post?._id}`}
          >
            {post?.title}
          </a>
        </li>
      ))}
    </ul>
  );
}