import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const whatwedoSectionType = defineType({
  name: 'whatwedoSection',
  title: 'Lo que Hacemos',
  type: 'document',
  icon: UsersIcon,
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
      name: 'descriptionText',
      title: 'Texto Descriptivo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón de Acción',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageArray',
      title: 'Imágenes de Trabajos',
      type: 'array',
      of: [
        { type: 'imageObject' }
      ],
      validation: (Rule) => [
        Rule.required(),
        Rule.min(3),
        Rule.max(3),
        Rule.unique(),
      ]
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
        media: UsersIcon,
      };
    },
  },
})