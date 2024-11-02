import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const configType = defineType({
  name: 'config',
  title: 'Configuraciones',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'contactLink',
      title: 'Link URL de Contacto',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'information',
      title: 'Información de la Empresa',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Correo electrónico',
          type: 'email',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Teléfono de Contacto',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'address',
          title: 'Dirección',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Ciudad',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'País',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Redes Sociales",
      type: "array",
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "redSocial",
              title: "Red Social",
              type: "string",
              options: {
                list: ["facebook", "X", "WhatsApp", "Instagram", "linkedIn", "YouTube", "TikTok", "Otra" ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => [ 
        Rule.required(),
        Rule.min(2)
      ],
    }),
  ]
})