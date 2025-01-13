import { defineQuery } from "next-sanity";

export const EMAILSENDING_QUERY = defineQuery(`*[_type == 'config'][0].information{
  phone,
  email
}`)

export const FOOTERSETTINGS_QUERY = defineQuery(`*[_type == 'config'][0]{
  information,
  socialLinks
}`)