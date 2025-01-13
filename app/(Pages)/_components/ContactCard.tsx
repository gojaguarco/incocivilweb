"use client"
import { Button } from "@/sanity.types";
import { sendEmail } from "./sendEmail";
import { useActionState, useEffect } from "react";

type TProps = {
  content: {
    title: string;
    description: string;
    ctaButton: Button;
} | null,
  className?: string,
  adminData: {
    phone: number, 
    email: string
  } | null
}

const ContactCard = ({content, className, adminData}: TProps) => {

  const [formState, formAction] = useActionState(sendEmail, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (formState && formState.error) { 
      console.log(formState.error)
    }
    if (formState.success === true){
      window.alert("Correo electrónico enviado.")
    }
  }, [formState]);

  return (
    <form className={`${className} flex flex-col gap-2 rounded-xl py-7 px-6 el-shado justify-center el-shadow`}
    action={formAction}
    >
      <input type="hidden" name="adminData" value={JSON.stringify(adminData)}/>
      <div>
        <h2 className="text-2xl">{content?.title}</h2>
        <p>{content?.description}</p>
      </div>
        <div>
          <label className="text-gray-900">Nombre Completo:</label>
          <input type="text" id="name" name="name" autoComplete="name" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="Juan Pérez" required />
        </div>
        <div>
          <label className="text-gray-900">Email:</label>
          <input type="email" id="email" name="email" autoComplete="email" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="tunombre@incocivil.com" required />
        </div>
        <div>
          <label className="text-gray-900">Teléfono:</label>
          <input type="tel" id="tel" name="tel" autoComplete="tel" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3" placeholder="300 123 4567" required />
        </div>
        <div>
          <label className="text-gray-900">Mensaje:</label>
          <textarea id="message" name="message" className="bg-light-dark border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full min-h-20 py-2 px-3" placeholder="Deja tu mensaje..." required />
        </div>
        <div className="flex w-full justify-end pt-3">
        <button className="px-8 py-2 rounded-lg text-sm text-nowrap flex-shrink-0 bg-accent1 text-slate-100 font-light hover:underline underline-offset-2 hover:-translate-y-0.5 hover:el-shadow">Enviar Mensaje:</button>
        </div>
    </form>
  )
}

export default ContactCard