import { defineField, defineType } from "sanity";
import { ImageOrVideoSchema } from "./generalSchemas";
import { ImagesIcon } from "@sanity/icons";

export const imageSectionType = defineType({
  name: 'imageSection',
  title: 'Sección de Posicionamiento',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
			name: 'title',
      title: 'Título de la sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'sectionName',
      title: 'Nombre de la sección (Opcional)',
      type: 'string',
		}),
    defineField({
      name: 'descriptionText',
      title: 'Texto Descriptivo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButton1',
      title: 'Botón de Acción 1',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButton2',
      title: '(Opcional) Botón de Acción 2',
      type: 'button',
    }),
    ImageOrVideoSchema,
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
        media: ImagesIcon,
      };
    },
  },
})