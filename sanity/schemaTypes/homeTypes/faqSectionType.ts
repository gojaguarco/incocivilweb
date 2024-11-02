import { UlistIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { ImageSchema } from "../generalSchemas";

export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'Preguntas Frecuentes',
  type: 'document',
  icon: UlistIcon,
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
		defineField({
			name: 'sectionDescription',
      title: 'Descripción de la sección',
      type: 'text',
      validation: (Rule) => Rule.required(),
		}),
    ImageSchema,
    defineField({
      name: 'faqs',
      title: 'Preguntas Frecuentes',
      type: 'array',
      of: [
        { 
          type: 'reference',  
          to: [{ type: 'faq' }]
         }
      ],
      options: {
        insertMenu: {
          showIcons: false,
        },
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.min(5),
        Rule.unique(),
      ]
    })
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
        media: UlistIcon,
      };
    },
  },
})