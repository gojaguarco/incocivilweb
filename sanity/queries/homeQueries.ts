import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = 
defineQuery(`*[_type == 'pages'][0]{
  homePage[] {
    ...,
    primarySurfaces[]->,
    surfaceList[]->,
    faqs []->,
  }
}`)

export const CONTACTCARD_QUERY = defineQuery(`*[_type == 'pages'][0].homePage[_type == 'contactSection'][0].contactCard`)
