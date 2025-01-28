import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageSchema } from "./generalSchemas";
import ColombianPrice from "../components/ColombianPrice";

export const surfaceTypesType = defineType({
  name: "surfaceTypes",
  title: "Tipos de Superficies",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del tipo de Superficie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción del tipo de Superficie",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    ImageSchema,
  ],
});

export const surfaceType = defineType({
  name: "surface",
  title: "Superficie",
  type: "document",
  fields: [
    defineField({
      name: "available",
      title: "Disponible",
      type: "boolean",
    }),
    defineField({
      name: "title",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Código del Material",
      type: "number",
    }),
    ImageSchema,
    defineField({
      name: "type",
      title: "Tipo de Superficie",
      type: "reference",
      to: { type: "surfaceTypes" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caliber",
      title: "Calibre",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Precio m2",
      type: "string",
      components: { input: ColombianPrice },
    }),
    defineField({
      name: "formatos",
      title: "Formatos",
      type: "array",
      of: [
        defineArrayMember({
          name: "formato",
          title: "Formato",
          type: "reference",
          to: { type: "surfaceFormat" },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
    }),
  ],
});
