import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { ImageOrVideoSchema } from "./generalSchemas";

export const serviceType = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
			name: 'title',
      title: 'Título del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
		}),
    defineField({
      name: 'descriptionText',
      title: 'Corta descripción del Servicio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    ImageOrVideoSchema,
    defineField({
      name: 'body',
      title: 'Cuerpo del Servicio',
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
        media: WrenchIcon,
      };
    },
  },
})