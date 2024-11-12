import { defineQuery } from "next-sanity";


export const SERVICES_QUERY = defineQuery(`*[_type == 'service'][]`)

export const SERVICE_QUERY = defineQuery(`*[_type == 'service' && _id == $id][0]`)