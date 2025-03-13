"use server";
import {z, ZodFormattedError} from 'zod';

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
  const rawData = {
    nombre: formData.get("nombre") as string,
    apellido: formData.get("apellido") as string,
    email: formData.get("email") as string,
    telefono: formData.get("telefono") as string,
    mensaje: formData.get("mensaje") as string,
    selectedSurfaces: formData.getAll("selectedSurfaces") as string[],
  }
  
  console.log({rawData})
  const data = formSchame.safeParse(rawData)

  
  if (!data.success) {
    const errors =   data.error.format();
    console.log({errors})
    return {
      success: false,
      errors: errors
    }
  }
  console.log({data, surfaces: data.data?.selectedSurfaces})

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
  selectedSurfaces: z.array(z.string()).transform((strings) => 
    strings.map(str => JSON.parse(str))  // Parse each string into an object
  )
})