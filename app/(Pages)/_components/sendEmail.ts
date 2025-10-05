"use server";
import ContactEmailTemplate from "@/emails/ContactEmail";
import { ErrorResponse, Resend } from "resend";
import z from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  tel: z.string(),
  message: z.string(),
  adminData: z.object({
    email: z.string().email(),
    phone: z.number(),
  }),

  captchaToken: z.string().min(1),
});
type TFormState = {
  success: boolean;
  error: ErrorResponse | string | null;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  formState: TFormState,
  formData: FormData
): Promise<TFormState> => {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    tel: formData.get("tel") as string,
    message: formData.get("message") as string,
    adminData: JSON.parse(formData.get("adminData") as string) as {
      phone: string;
      email: string;
    },
    captchaToken: formData.get("captchaToken") as string,
  };

  const { success, data, error: zError } = formSchema.safeParse(rawFormData);
  if (!success || !process.env.RECAPTCHA_SECRET_KEY) {
    console.error(zError);
    return {
      error: "something went wrong",
      success: false,
    };
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.captchaToken}`;
  const captchaResponse = await fetch(verificationUrl, {
    method: "POST",
  });
  const captchaData = await captchaResponse.json();
  if (captchaData.success) {
    try {
      const resendResp = await resend.emails.send({
        from: "Incocivil <noreply@incocivil.com>",
        to: [rawFormData.email],
        bcc: [rawFormData.adminData.email],
        subject: "Mensaje de cliente.",
        react: ContactEmailTemplate({ data: rawFormData }),
      });

      if (resendResp.error) {
        return {
          success: false,
          error: resendResp.error,
        };
      }
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "ups",
      };
    }
  } else {
    // console.log("set error");
    return {
      success: false,
      error: "ups",
    };
  }
  return {
    success: false,
    error: "ups",
  };
};
