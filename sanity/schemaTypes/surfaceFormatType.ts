import { defineField, defineType } from "sanity";

export const surfaceFormatType = defineType({
  name: "surfaceFormat",
  title: "Formatos de Superficie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "wide",
      title: "Ancho",
      description: "En (cms)",
      type: "number",
    }),
    defineField({
      name: "height",
      title: "Alto",
      description: "En (cms)",
      type: "number",
    })
  ]
});