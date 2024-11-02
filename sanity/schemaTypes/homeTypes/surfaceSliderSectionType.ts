import { InlineElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const surfaceSliderSectionType = defineType({
	name: 'surfaceSliderSection',
	title: 'Slider de Superficies',
	type: 'document',
  icon: InlineElementIcon,
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
    defineField({
      name: 'surfaceList',
      title: 'Superficies Destacadas',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [{ type: 'surface' }]
        }
      ],
      validation: (Rule) => [
        Rule.required(),
        Rule.unique(),
        Rule.min(8),
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
        media: InlineElementIcon,
      };
    },
  },
})