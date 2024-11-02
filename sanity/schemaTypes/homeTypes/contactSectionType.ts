import { defineField, defineType } from "sanity";
import { ImageSchema } from "../generalSchemas";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSectionType = defineType({
  name: 'contactSection',
  title: 'Contacto',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
			name: 'title',
      title: 'Título de la sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'sectionName',
      title: 'Nombre de la sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
		}),
    ImageSchema,
    defineField({
      name: 'homeProject',
      title: 'Proyecto para Hogar',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto',
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
    defineField({
      name: 'comercialProject',
      title: 'Proyecto Comercial',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto',
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
      title: 'sectionName',
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
        media: EnvelopeIcon,
      };
    },
  },
})