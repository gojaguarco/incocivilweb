import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export const servicesSectionType = defineType({
	name: 'servicesSection',
			title: 'Sección de Servicios',
			type: 'object',
			icon: WrenchIcon,
			fields: [
				defineField({
					name: 'titleDescription',
					title: 'Descripción del Título',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'title',
					title: 'Título',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'sectionName',
					title: 'Nombre de la Sección',
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
					name: 'ctaButton',
					title: 'Botón de Acción',
					type: 'button',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'primarySurfaces',
					title: 'Tipos de Superficies Principales',
					type: 'array',
					of: [
						{
							type: 'reference',
							to: [
								{ type: 'surfaceTypes' }
							]
						}
					],
					validation: (Rule) => [
						Rule.min(4),
						Rule.max(4),
						Rule.required(),
						Rule.unique(),
					]
				}),
				defineField({
					name: 'secondaryServices',
					title: 'Servicios Secundarios',
					type: 'array',
					of: [
						{type: 'secondaryService'}
					],
					validation: (Rule) => [
						Rule.min(3),
						Rule.max(3),
						Rule.required(),
						Rule.unique(),
					]
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
						media: WrenchIcon,
					};
				},
			},
})