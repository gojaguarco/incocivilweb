import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { ImageSchema } from "../generalSchemas";

export const homeHeroSectionType = defineType({
  name: 'homeHeroSection',
  title: 'Sección Principal (Hero)',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'simpleTitle',
      title: 'Título Principal',
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
      name: 'descriptionCard',
      title: 'Cuadro Descriptivo',
      type: 'object',
      fields: [
        defineField({
          name: 'descriptionTitle',
          title: 'Título',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'projectNumber',
          title: 'Número de Proyectos',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'descriptionText',
          title: 'Texto Descriptivo',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'primaryButton',
          title: 'Botón Primario',
          type: 'button',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Botón Secundario',
          type: 'button',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expertiseCard',
      title: 'Cuadro de experiencia',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Imagen',
          type: 'imageObject',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButton',
          title: 'Botón Call to Action',
          type: 'button',
          validation: (Rule) => Rule.required(),
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'simpleTitle',
      subtitle: 'highlightedTitle',
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
        title: `Hero`,
        subtitle: `${title} ${subtitle}`,
        media: PresentationIcon,
      };
    },
  },
})