import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: 'faq',
  title: 'Pregunta Frecuente',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
})