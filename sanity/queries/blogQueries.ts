import { defineQuery } from "next-sanity";

export const BLOGS_QUERY =
  defineQuery(`*[_type == "post" ][0...12]{
  _id, title, description, image
}`);

export const BLOG_QUERY =
  defineQuery(`*[_type == "post" && _id == $id][0]{
  title, description, body, image, categories, publishedAt
}`);

