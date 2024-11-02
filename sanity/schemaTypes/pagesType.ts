import { DesktopIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pagesType = defineType({
  name: "pages",
  title: "Páginas",
  type: "document",
  icon: DesktopIcon,
  fields: [
    defineField({
      name: "homePage",
      title: "Home",
      type: "array",
      of: [{ type: "homeHeroSection" }, { type: "servicesSection" }, { type: 'whyusSection' }, { type: 'surfaceSliderSection' }, { type: 'faqSection' }, { type: 'contactSection' }],
      validation: (Rule) => [
        Rule.custom((content) => {
          //@ts-ignore
          const typeCounts = content.reduce((acc, item) => {
            //@ts-ignore
            const itemType = item._type;
            //@ts-ignore
            acc[itemType] = (acc[itemType] || 0) + 1;
            return acc;
          }, {});

          //@ts-ignore
          const duplicatePaths = content
            .map((item, index) => {
              //@ts-ignore
              const itemType = item._type;
              //@ts-ignore
              if (typeCounts[itemType] > 1) {
                return [index];
              }
              return null;
            })
            .filter(Boolean); 
            
          return duplicatePaths.length === 0
            ? true
            : {
                message: "Solo puede haber una sección de cada tipo. Por favor elimine las duplicadas.",
              };
        }),
        Rule.required(),
        Rule.min(2),
        Rule.max(6)
      ],
    }),
    defineField({
      name: "aboutPage",
      title: "Sobre Nosotros",
      type: "array",
      of: [{ type: "aboutHeroSection" }, { type: 'whatwedoSection'}, { type: 'imageSection' }],
      validation: Rule => [
        Rule.custom(content => {
        // get the possible headers from the contentArray (if any are there)
          const headers = (content || []).filter(
              item =>
                //@ts-ignore
                  item._type === 'aboutHeroSection' || item._type === 'whatwedoSection'
          )
          // create an array with the paths of these header items
          const headerPaths = headers.map(
            //@ts-ignore
              (header, index) => [{ _key: header._key }] || [index]
          )
          // See if headerPaths is longer then 1, if it is, there are too many headers and we then use the paths to mark the headers in the array and display the error message
          return headerPaths.length <= 2
              ? true
              : {
                  message: 'Solo puede haber una sección de este tipo. Por favor elimine una.',
                  paths: headerPaths
              }
      }),
      Rule.required(),
      Rule.min(2),
      Rule.max(6)
    ]
    }),
    defineField({
      name: "projectsPage",
      title: "Nuestros Proyectos",
      type: "array",
      of: [{ type: 'projectSection' }, { type: 'projectContactSection' }],
      validation: Rule => [
        Rule.custom(content => {
        // get the possible headers from the contentArray (if any are there)
          const headers = (content || []).filter(
              item =>
                //@ts-ignore
                  item._type === 'projectContactSection'
          )
          // create an array with the paths of these header items
          const headerPaths = headers.map(
            //@ts-ignore
              (header, index) => [{ _key: header._key }] || [index]
          )
          // See if headerPaths is longer then 1, if it is, there are too many headers and we then use the paths to mark the headers in the array and display the error message
          return headerPaths.length <= 1
              ? true
              : {
                  message: 'Solo puede haber una sección de este tipo. Por favor elimine una.',
                  paths: headerPaths
              }
      }),
      Rule.required(),
      Rule.min(2),
      Rule.max(8)
    ]
    }),
  ],
});
