"use server";
import { sanityFetch } from "@/sanity/lib/client";
import { ADMIN_EMAIL_QUERY } from "@/sanity/queries/settingsQueries";
import { Resend } from "resend";
import { ZodFormattedError } from "zod";
import { adminEmailSchema, formSchema } from "./captureInfoZods";
import { NewQuoteEmail } from "@/emails/NewQuoteEmail";

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

const resend = new Resend(process.env.RESEND_API_KEY);

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
    captchaToken: formData.get("captchaToken") as string,
  };

  const { data, success, error } = formSchema.safeParse(rawData);

  if (!success || !process.env.RECAPTCHA_SECRET_KEY) {
    const issues = error?.issues;

    const formattedErrors = issues?.reduce((acc, issue) => {
      const path = issue.path.join(".");
      if (!acc[path]) {
        acc[path] = [];
      }
      acc[path].push(issue.message);
      return acc;
    }, {} as Record<string, string[]>);

    return {
      success: false,
      errors: { ...formattedErrors, _errors: [] },
    };
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.captchaToken}`;
  const captchaResponse = await fetch(verificationUrl, {
    method: "POST",
  });

  const captchaData = await captchaResponse.json();
  if (captchaData.success) {
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
      await resend.emails.send({
        from: "Incocivil <cotizador@incocivil.com>",
        to: [adminEmail, data.email],
        // to: ["julian.m.bustos@gmail.com"],
        subject: "Cotización",
        react: NewQuoteEmail({
          data: {
            email: data.email,
            message: data.mensaje,
            name: `${data.nombre} ${data.apellido}`,
            tel: data.telefono,
            selectedSurfaces: data.selectedSurfaces,
          },
        }),
      });
    } catch (error) {
      console.log({ error });
      return {
        success: false,
        errors: {
          _errors: ["algo salió mal"],
        },
      };
    }
    // console.log({ data, surfaces: data.data?.selectedSurfaces });

    return {
      success: true,
      errors: null,
    };
  } else {
    return {
      success: false,
      errors: {
        _errors: ["algo salió mal"],
      },
    };
  }
};
