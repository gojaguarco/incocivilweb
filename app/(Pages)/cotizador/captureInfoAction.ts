"use server";
import {z, ZodError, ZodFormattedError} from 'zod';

type FormState = {
  success: boolean;
  errors: ZodFormattedError<{
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    mensaje: string;
  }> | null | undefined;
}

export const captureInfoAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => { 
  console.log({formData})


  const data = formSchame.safeParse({
    nombre: formData.get("nombre") as string,
    apellido: formData.get("apellido") as string,
    email: formData.get("email") as string,
    telefono: formData.get("telefono") as string,
    mensaje: formData.get("mensaje") as string,
  })

  console.log({data})

  if (!data.success) {
    const errors =   data.error.format();
    console.log({errors})
    return {
      success: false,
      errors: errors
    }
  }

  return {
    success: true,
    errors: null
  }

};


const formSchame = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Ese no es un email válido!").min(1, "El email es requerido"),
  telefono: z.string().min(7, "Ese no es un número de teléfono válido"),
  mensaje: z.string().optional().nullable(),
})