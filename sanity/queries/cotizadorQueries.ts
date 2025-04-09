import { defineQuery } from "next-sanity";

export const COTIZADOR_QUERY = defineQuery(`*[_type == 'pages'][0]{
  cotizador
}`);
