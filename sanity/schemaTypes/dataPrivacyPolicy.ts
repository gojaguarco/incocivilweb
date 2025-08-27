import { defineType, defineField } from "sanity";

export const dataPrivacyPolicySchema = defineType({
  name: "dataPrivacyPolicy",
  title: "Escribir Política de tratamiento de datos personales ",
  type: "document",
  fields: [
    defineField({
      name: "policy",
      title: "Política",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
