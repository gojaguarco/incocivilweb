import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageSchema } from "./generalSchemas";
import ColombianPrice from "../components/ColombianPrice";
import SizeIcon from "../components/icons/SizeIcon";
import { numberToColombianPriceString } from "@/app/helpers";

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
      name: "formats",
      title: "Formatos",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: "formato",
          title: "Formato",
          type: "object",
          icon: SizeIcon,
          fields: [
            defineField({
              name: "width",
              title: "Ancho",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "height",
              title: "Alto",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "formatPrice",
              title: "Precio Formato",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              width: "width",
              height: "height",
              formatPrice: "formatPrice",
            },
            prepare({ width, height, formatPrice }) {
              return {
                title: `Ancho: ${width || "por definir "}cm x Alto: ${height || "por definir " }cm`,
                subtitle: `Precio: ${numberToColombianPriceString(formatPrice || 0)}`,
              };
            },
          },
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
