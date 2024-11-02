import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageOrVideoSchema } from "../generalSchemas";


export const whyusSectionType = defineType({
	name: 'whyusSection',
	title: 'Por qué elegirnos',
	type: 'document',
	icon: UsersIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Título de la Sección',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'sectionName',
			title: 'Nombre de la Sección',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		ImageOrVideoSchema,
		defineField({
			name: 'benefits',
			title: 'Beneficios Destacados',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'benefit',
					title: 'Beneficio',
					type: 'object',
					fields: [
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
							name: 'image',
							title: 'Icono PNG sin Fondo',
							type: 'imageObject',
							validation: (Rule) => Rule.required(),
						})
					]
				})
			],
			validation: (Rule) => [
				Rule.required(),
				Rule.unique(),
				Rule.min(3),
				Rule.max(3),
			],
		}),
		defineField({
			name: 'ctaButton',
			title: 'Botón Call to Action',
			type: 'button',
			validation: (Rule) => Rule.required(),
		}),
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
				media: UsersIcon,
			};
		},
	},
})