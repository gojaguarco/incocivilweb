"use server";
import ContactEmailTemplate from "@/emails/ContactEmail";
import { ErrorResponse, Resend } from "resend";

type TFormState = {
  success: boolean;
  error: ErrorResponse | null;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formState: TFormState, formData: FormData) => {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    tel: formData.get("tel") as string,
    message: formData.get("message") as string,
    adminData: JSON.parse(formData.get("adminData") as string) as {
      phone: string;
      email: string;
    },
  };

  const { error } = await resend.emails.send({
    from: "Incocivil <noreply@incocivil.com>",
    to: [rawFormData.email],
    bcc: [rawFormData.adminData.email],
    subject: "Mensaje de cliente.",
    react: ContactEmailTemplate({ data: rawFormData }),
  });

  if (error) {
    return {
      success: false,
      error: error,
    };
  }

  // console.log({data});

  return {
    success: true,
    error: null,
  };
};
