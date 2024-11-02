import { defineField } from "sanity";

export const ImageSchema = defineField({
  name: "imageObject",
  title: 'Imagen',
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      validation: (Rule) => Rule.required(),
    },
  ],
  validation: (Rule) => Rule.required(),
});

export const VideoSchema = defineField({
  name: "videoObject",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      // group: "general",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagenDeCarga",
      title: "Imagen de Carga",
      type: "imageObject",
    })
  ],
  validation: (Rule) => Rule.required(),
})

export const ImageOrVideoSchema = defineField({
  name: 'ImageOrVideo',
  title: 'Contenido Audiovisual',
  type: 'object',
  fields: [
    defineField({
      name: "imagenOVideo",
      title: "Imagen o Video",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "imageObject",
      hidden: ({ parent }) => !parent?.imagenOVideo,
      options: {
        collapsible: false,
      },
      //@ts-ignore
      validation: Rule => Rule.custom((_, context) => (context.parent?.imagenOVideo === true && context.parent?.imagen === undefined) ? "La Imagen es Requerida" : true)
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "videoObject",
      hidden: ({ parent }) => parent?.imagenOVideo,
      options: {
        collapsible: false,
      },
      //@ts-ignore
      validation: Rule => Rule.custom((_, context) => (context.parent?.imagenOVideo === false && context.parent?.video === undefined) ? "El Video es Requerido" : true)
    })
  ],
  validation: (Rule) => Rule.required(),
})
