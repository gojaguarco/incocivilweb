import { defineQuery } from "next-sanity";

export const CATALOGO_QUERY = defineQuery(`*[_type == "surface" && available]{
  _id, 
  title, 
  "image": imageObject, 
  "type": type -> {
      title,
      _id
  },
  caliber,
  price,
  "formats": formats[] {
      height, 
      width,
      "price": formatPrice
    },
    code,
    description,
    available
}`);

export const ALL_SURFACE_TYPES_QUERY = defineQuery(`*[_type == "surfaceTypes"]{
  _id, 
  title
} `);

