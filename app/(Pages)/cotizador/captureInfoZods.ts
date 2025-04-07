import { z } from "zod";

export const SurfaceToSendAdminEmailSchema = z.object({
  width: z.number(),
  height: z.number(),
  totalSurface: z.number(),
  id: z.string(),
  code: z.string(),
  name: z.string(),
  image: z.string(),
  quanity: z.number(),
  formatPrice: z.number(),
});


export type SurfaceToSendAdminEmail = z.infer<typeof SurfaceToSendAdminEmailSchema>

export const selectedSurfacesSchema = z.array(SurfaceToSendAdminEmailSchema);


export type SelectedSurfaces = z.infer<typeof selectedSurfacesSchema>;

export const formSchema = z.object({
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
    .pipe(selectedSurfacesSchema),
});

export const adminEmailSchema = z.string();
