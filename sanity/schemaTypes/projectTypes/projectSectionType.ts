import { InlineElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectSectionType = defineType({
  name: 'projectSection',
  title: 'Sección de Proyectos',
  type: 'document',
  icon: InlineElementIcon,
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
    defineField({
      name: 'ctaButton1',
      title: 'Botón de Acción 1',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Proyectos',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'project' }]
      }],
      validation: (Rule) => [
        Rule.required(),
        Rule.unique(),
        Rule.min(2),
      ],
    })
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
        media: InlineElementIcon,
      };
    },
  },
})