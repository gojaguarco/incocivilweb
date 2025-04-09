import { defineField } from "sanity";

export const cotizadorSchema = defineField({
  name: "cotizador",
  title: "Cotizador",
  type: "object",
  group: "cotizador",
  fields: [
    defineField({
      name: "surfaceSelection",
      title: "Seleccion de superficies",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "subtitle",
          title: "Subtítulo",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "surfaceTypeSelection",
          title: "Título Selección Tipo de Superficie",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "surfaceSelection",
          title: "Título Selección de Superficie",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "formatSelection",
          title: "Título Selección de Formatos",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "footer",
          title: "Pie de página",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: R => R.required()
            }),
            defineField({
              name: "link",
              title: "Dirección del vínculo",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Título",
                  type: "string",
                  validation: R => R.required()
                }),
                defineField({
                  name: "link",
                  title: "Vínculo",
                  type: "string",
                  validation: R => R.required()
                }),
              ],
            }),
          ],
        }),
      ]
    }),
    defineField({
      name: "formContent",
      title: "Contenido del Formulario",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          type: "string",
          validation: R => R.required()
        }),
        defineField({
          name: "successMessage",
          title: "Mensaje de cotización exitosa",
          type: "string",
          validation: R => R.required()
        })
      ]
    })
  ],
});
