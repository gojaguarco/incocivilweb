import { defineQuery } from "next-sanity"


export const PROJECTS_QUERY = defineQuery(`*[_type == 'pages'][0]{
  projectsPage[]{
    ...,
    projects[] -> {
      _id,
      image,
      title,
    }
  }
}`) 


export const PROJECT_QUERY = defineQuery(`*[_type == 'project' && _id == $id][0]`)