import { defineQuery } from "next-sanity";

export const ABOUTPAGE_QUERY = 
defineQuery(`*[_type == 'pages'][0]{
  aboutPage
}`)
