import { defineField, defineType } from "sanity";
import { ImageSchema } from "../generalSchemas";
import { AddCommentIcon } from "@sanity/icons";

export const projectContactSectionType = defineType({
  name: 'projectContactSection',
  title: 'Sección de Contacto',
  type: 'document',
  icon: AddCommentIcon,
  fields: [
    defineField({
      name: 'titleDescription',
      title: 'Descripción del Título',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    ImageSchema,
    defineField({
      name: 'contactCard',
      title: 'Cuadro de Email',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButton',
          title: 'Botón de Call to Action',
          type: 'button',
          validation: (Rule) => Rule.required(),
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'titleDescription',
      subtitle: 'title',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      if (!title || !subtitle) {
        return {
          title: "Sin título",
          subtitle: "Sin subtítulo",
        };
      }
      return {
        title: `${title}`,
        subtitle: `${subtitle}`,
        media: AddCommentIcon,
      };
    },
  },
})