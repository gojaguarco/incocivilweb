"use server";
import { sanityFetch } from "@/sanity/lib/client";
import { ADMIN_EMAIL_QUERY } from "@/sanity/queries/settingsQueries";
// import { Resend } from "resend";
import { ZodFormattedError } from "zod";
import { adminEmailSchema, formSchema } from "./captureInfoZods";
import { QuoteEmailTemplate } from "@/emails/QuoteEmail";

type FormState = {
  success: boolean;
  errors:
    | ZodFormattedError<{
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        mensaje: string;
      }>
    | null
    | undefined;
};

// const resend = new Resend(process.env.RESEND_API_KEY);

export const captureInfoAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const rawData = {
    nombre: formData.get("nombre") as string,
    apellido: formData.get("apellido") as string,
    email: formData.get("email") as string,
    telefono: formData.get("telefono") as string,
    mensaje: formData.get("mensaje") as string,
    selectedSurfaces: formData.getAll("selectedSurfaces") as string[],
  };

  const { data, success, error } = formSchema.safeParse(rawData);

  if (!success) {
    const errors = error.format();
    console.log({ errors });
    return {
      success: false,
      errors: errors,
    };
  }

  const rawAdminEmail = await sanityFetch({
    query: ADMIN_EMAIL_QUERY,
  });
  // console.log({adminEmail})

  const {
    data: adminEmail,
    success: adminSuccess,
    error: adminError,
  } = adminEmailSchema.safeParse(rawAdminEmail);

  if (!adminSuccess) {
    const errors = adminError.format();
    return {
      success: false,
      errors,
    };
  }
  try {
    console.log({
      from: "Incocivil <cotizador@incocivil.com>",
      to: [adminEmail, data.email],
      // to: ["julian.m.bustos@gmail.com"],
      subject: "Mensaje de cliente",
      react: QuoteEmailTemplate({
        data: {
          email: data.email,
          message: data.mensaje,
          name: `${data.nombre} ${data.apellido}`,
          tel: data.telefono,
          selectedSurfaces: data.selectedSurfaces,
        },
      }),
    });

    console.log({
      email: data.email,
      message: data.mensaje,
      name: `${data.nombre} ${data.apellido}`,
      tel: data.telefono,
      selectedSurfaces: data.selectedSurfaces,
    });
    // await resend.emails.send({
    //   from: "Incocivil <cotizador@incocivil.com>",
    //   to: [adminEmail, data.email],
    //   // to: ["julian.m.bustos@gmail.com"],
    //   subject: "Mensaje de cliente",
    //   react: QuoteEmailTemplate({
    //     data: {
    //       email: data.email,
    //       message: data.mensaje,
    //       name: `${data.nombre} ${data.apellido}`,
    //       tel: data.telefono,
    //       selectedSurfaces: data.selectedSurfaces,
    //     },
    //   }),
    // });

    // console.log({resendResp})
  } catch (error) {
    console.log({ error });
    return {
      success: false,
      errors: {
        _errors: ["something went wrong"],
      },
    };
  }
  // console.log({ data, surfaces: data.data?.selectedSurfaces });

  return {
    success: true,
    errors: null,
  };
};
