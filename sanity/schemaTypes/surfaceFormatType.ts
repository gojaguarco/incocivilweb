import { defineField, defineType } from "sanity";
import SizeIcon from "../components/icons/SizeIcon";

export const surfaceFormatType = defineType({
  name: "surfaceFormat",
  title: "Formatos de Superficie",
  type: "document",
  icon: SizeIcon,
  fields: [
    defineField({
      name: "width",
      title: "Ancho",
      description: "En (cm)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "height",
      title: "Largo",
      description: "En (cm)",
      type: "number",
      validation: (Rule) => Rule.required(),
    })
  ],
  preview: {
    select: {
      width: "width",
      height: "height",
    },
    prepare({ width, height }) {
      if (!width || !height) {
        return {
          title: "Formato de Superficie",
        };
      }
      return {
        title: `${width} cm x ${height} cm`,
      };
    },
  }
});