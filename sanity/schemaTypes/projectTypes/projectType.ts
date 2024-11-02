import { defineField, defineType } from "sanity";
import { DocumentVideoIcon } from "@sanity/icons";

export const projectType = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
			name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      validation: (Rule) => Rule.required(),
		}),
    defineField({
      name: 'descriptionText',
      title: 'Corta descripción del Proyecto',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen de Portada del Proyecto',
      type: 'imageObject',
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo del Proyecto',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'descriptionText',
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
        media: DocumentVideoIcon,
      };
    },
  },
})