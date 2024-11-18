import Link from "next/link";
import { BLOGS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Esquina from "./Esquina";

export function Posts({ posts }: { posts: BLOGS_QUERYResult }) {
  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <Link className={`p-2 bg-primary-light rounded-2xl flex items-center justify-center h-48 lg:h-56 el-shadow group relative text-light`} href={`/blog/${post._id}`} key={index}>
          <Image className="rounded-xl w-full h-full object-cover" src={urlFor(post.image).width(500).height(500).format('webp').url()} alt={post.image.alt} width={500} height={500}/>
          <footer className="absolute bottom-2 left-2 right-2 flex flex-col items-end">
            <div className={`bg-primary-light rounded-tl-xl flex px-2 py-1 items-center gap-1.5 max-w-[80%] relative`}>
              <div className="w-4 h-4 rounded-full bg-accent1 group-hover:rotate-90 transition-all flex items-center justify-center">
              <svg className="w-3.5 h-3.5 -rotate-45" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />  
                <path d="M12 5l0 14" />
                <path d="M18 11l-6 -6" />
                <path d="M6 11l6 -6" />
              </svg>
              </div>
              <h6 className={`text-light group-hover:underline underline-offset-2`}>{post.title}</h6>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -top-2.5 right-0" colorHex={`414553`}/>
              <Esquina className="absolute rotate-90 w-2.5 h-2.5 -left-2.5 bottom-0" colorHex={`414553`}/>
            </div>
            <p className="bg-primary-light w-full px-2 pt-1 relative">
              {post.description}
              <Esquina className="absolute rotate-180 w-2.5 h-2.5 -top-2.5 left-0" colorHex={`414553`}/>
            </p> 
          </footer>
      </Link>
      ))}
    </ul>
  );
}