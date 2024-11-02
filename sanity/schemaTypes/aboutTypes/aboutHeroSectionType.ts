import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { ImageOrVideoSchema } from "../generalSchemas";

export const aboutHeroSectionType = defineType({
  name: 'aboutHeroSection',
  title: 'Sección Principal (Hero)',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'titleDescription',
      title: 'Descripción del Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title1',
      title: 'Título 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title2',
      title: 'Título 2',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedTitle',
      title: 'Título Resaltado',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionText',
      title: 'Texto Descriptivo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    ImageOrVideoSchema,
  ],
  preview: {
    select: {
      title: 'titleDescription',
      subtitle: 'DescriptionText',
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
        media: PresentationIcon,
      };
    },
  },
})