import { defineField, defineType } from "sanity";
import { ImageSchema } from "./generalSchemas";


export const surfaceTypesType = defineType({
    name: 'surfaceTypes',
    title: 'Tipos de Superficies',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nombre de la Superficie',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción de la Superficie',
            type: 'blockContent',
            validation: (Rule) => Rule.required(),
        }),
        ImageSchema,
    ]
})

export const surfaceType = defineType({
    name: 'surface',
    title: 'Superficie',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
        }),
        ImageSchema,
        defineField({
            name: 'type',
            title: 'Tipo de Superficie',
            type: 'reference',
            to: { type: 'surfaceTypes' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio m2',
            type: 'number',
        }),
        defineField({
            name: 'code',
            title: 'Código del Material',
            type: 'number',
        })
    ]
})