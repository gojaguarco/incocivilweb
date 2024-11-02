import { defineField, defineType } from "sanity";

export const buttonType = defineType({
    name: 'button',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Texto',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Naranja', value: 'naranja' },
                    { title: 'Amarillo', value: 'amarillo' },
                    { title: 'Claro', value: 'claro' },
                    { title: 'Oscuro', value: 'oscuro' },
                ]
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'size',
            title: 'Tamaño',
            type: 'string',
            options: {
                list: [
                    { title: 'Pequeño', value: 'pequeño' },
                    { title: 'Mediano', value: 'mediano' },
                    { title: 'Grande', value: 'grande' },
                ]
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ]
})