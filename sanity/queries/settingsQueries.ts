import { defineQuery } from "next-sanity";

export const EMAILSENDING_QUERY =
  defineQuery(`*[_type == 'config'][0].information{
  phone,
  email
}`);

export const FOOTERSETTINGS_QUERY = defineQuery(`*[_type == 'config'][0]{
  information,
  socialLinks
}`);

export const METADATA_QUERY = defineQuery(`*[_type == 'config'][0].metadata`);

export const ADMIN_EMAIL_QUERY = defineQuery(
  `*[_type == "config"][0].information.email`
);
