import { defineQuery } from "next-sanity";

export const SURFACETYPES_QUERY = defineQuery(`*[_type == 'surfaceTypes'][]`)

export const SURFACETYPE_QUERY = defineQuery(`*[_type == 'surfaceTypes' && _id == $id][0]`)

export const SURFACESBYTYPE_QUERY = defineQuery(`*[_type == 'surface' && type._ref == $id ][0...10]`)