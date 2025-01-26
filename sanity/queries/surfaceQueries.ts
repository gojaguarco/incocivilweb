import { defineQuery } from "next-sanity";

export const ALLSURFACETYPES_QUERY = defineQuery(`*[_type == 'surfaceTypes'][]`)

export const SURFACETYPEBYID_QUERY = defineQuery(`*[_type == 'surfaceTypes' && _id == $id][0]`)

export const SURFACESBYTYPE_QUERY = defineQuery(`*[_type == 'surface' && type._ref == $id ][0...10]`)

export const SURFACESBYTYPE_IDS_QUERY = defineQuery(`*[_type == 'surface' && type._ref == $id ][]._id`)

export const SURFACES_QUERY = defineQuery(`*[_type == 'surface'][]`)
export const SURFACE_QUERY = defineQuery(`*[_type == 'surface' && _id == $id ][0]{
  _id,
  title,
  imageObject,
  type -> {
    title
  }
}`)

export const ALLSURFACEIDS_QUERY = defineQuery(`*[_type == 'surface'][]._id`)

export const HOMESURFACEIDS_QUERY = defineQuery(`*[_type == 'pages'][0].homePage[_type == 'surfaceSliderSection'][0].surfaceList[]._ref
`)