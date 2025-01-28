import Link from "next/link";
import { BLOGS_QUERYResult } from "../../../sanity.types";
import Card from "./ItemCard";

export function Posts({ posts }: { posts: BLOGS_QUERYResult }) {
  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <li
          key={post._id}
        >
          <Link
            href={`/blog/${post._id}`}
          >
            <Card
              description={post.description}
              image={post.image.url}
              imageAlt={post.image.alt || post.title}
              title={post.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}