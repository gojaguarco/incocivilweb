import { defineQuery } from "next-sanity";

export const CATALOGO_QUERY = defineQuery(`*[_type == "surface"]{
  _id, 
  title, 
  "image": imageObject.asset->url, 
  "type": type -> {
      title,
      _id
  },
  caliber,
  price,
  "formats": formats[]->{
      height, 
      width
    },
    code,
    description
}`);

export const ALL_SURFACE_TYPES_QUERY = defineQuery(`*[_type == "surfaceTypes"]{
  _id, 
  title
} `);