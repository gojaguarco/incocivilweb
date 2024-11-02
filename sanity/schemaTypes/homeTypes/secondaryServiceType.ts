import { defineField, defineType } from "sanity";
import { ImageSchema } from "../generalSchemas";

export const secondaryServiceType = defineType({
  name: 'secondaryService',
  title: 'Servicio Secundario',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    ImageSchema,
    defineField({
      name: 'reference',
      title: 'Referencia al Servicio',
      type: 'reference',
      to: [{type: 'service'}],
      validation: (Rule) => Rule.required(),
    })
  ],
  
})