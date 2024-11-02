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