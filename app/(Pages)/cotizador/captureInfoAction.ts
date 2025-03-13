"use server";
import { sanityFetch } from "@/sanity/lib/client";
import { ADMIN_EMAIL_QUERY } from "@/sanity/queries/settingsQueries";
import { Resend } from "resend";
import { z, ZodFormattedError } from "zod";

const ADMIN_EMAIL = "julian.m.bustos@gmail.com";

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
  console.log({ formData });
  const rawData = {
    nombre: formData.get("nombre") as string,
    apellido: formData.get("apellido") as string,
    email: formData.get("email") as string,
    telefono: formData.get("telefono") as string,
    mensaje: formData.get("mensaje") as string,
    selectedSurfaces: formData.getAll("selectedSurfaces") as string[],
  };

  console.log({ rawData });
  const { data, success, error } = formSchema.safeParse(rawData);

  if (!success) {
    const errors = error.format();
    console.log({ errors });
    return {
      success: false,
      errors: errors,
    };
  }
  console.log({ data, surfaces: data.selectedSurfaces });

  const rawAdminEmail = await sanityFetch({
    query: ADMIN_EMAIL_QUERY,
  });
  // console.log({adminEmail})

  const {data: adminEmail, success: adminSuccess, error: adminError} = adminEmailSchema.safeParse(rawAdminEmail)
  
  if (!adminSuccess) {
    const errors = adminError.format();
    return {
      success: false,
      errors
    }
  }
  try {
    // await resend.emails.send({
    //   from: data.email,
    //   to: [ADMIN_EMAIL],
    //   subject: "Mensaje de cliente",
    // })
  } catch (error) {}

  return {
    success: true,
    errors: null,
  };
};

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z
    .string()
    .email("Ese no es un email válido!")
    .min(1, "El email es requerido"),
  telefono: z.string().min(7, "Ese no es un número de teléfono válido"),
  mensaje: z.string().optional().nullable(),
  selectedSurfaces: z
    .array(z.string())
    .transform((strings) => strings.map((str) => JSON.parse(str)))
    .pipe(
      z.array(
        z.object({
          width: z.number(),
          height: z.number(),
          totalSurface: z.number(),
        })
      )
    ),
});


const adminEmailSchema = z.string() 