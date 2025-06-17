import { defineField } from "sanity";

export const ImageSchema = defineField({
  name: "imageObject",
  title: "Imagen",
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
  validation: (Rule) =>
    Rule.custom((value) => {
      // console.log({value})
      if (!value?.asset?._ref) {
        return "La imagen es requerida."; // Or your preferred error message
      }
      return true;
    }),
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
    }),
  ],
  validation: (Rule) => Rule.required(),
});

export const ImageOrVideoSchema = defineField({
  name: "ImageOrVideo",
  title: "Contenido Audiovisual",
  type: "object",
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
      validation: (Rule) =>
        Rule.custom((_, context) =>
          // @ts-expect-error it does exist
          context.parent?.imagenOVideo === true &&
          // @ts-expect-error it does exist
          context.parent?.imagen === undefined
            ? "La Imagen es Requerida"
            : true
        ),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "videoObject",
      hidden: ({ parent }) => parent?.imagenOVideo,
      options: {
        collapsible: false,
      },
      validation: (Rule) =>
        Rule.custom((_, context) =>
          // @ts-expect-error it does exist
          context.parent?.imagenOVideo === false &&
          // @ts-expect-error it does exist
          context.parent?.video === undefined
            ? "El Video es Requerido"
            : true
        ),
    }),
  ],
  validation: (Rule) => Rule.required(),
});
