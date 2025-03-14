"use client";
import { numberToColombianPriceString } from "@/app/helpers";
import { ComponentPropsWithoutRef, Dispatch, SetStateAction, useActionState, useEffect, useState } from "react";
import { cn } from "../_lib/cn";
import { captureInfoAction } from "./captureInfoAction";
import { SurfaceFormat } from "./Cotizador";


const CaptureForm = ({ totalToShow, selectedFormats, setShowTotal }: {
  totalToShow: number;
  selectedFormats: {
    [surfaceId: string]: SurfaceFormat
  };
  setShowTotal: Dispatch<SetStateAction<boolean>>;
}) => {

  const [formState, formAction, isPending] = useActionState(captureInfoAction, {
    success: false,
    errors: null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [data, setData] = useState(() => {
    const savedData = localStorage && localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      mensaje: '',
    };
  });

  // useEffect(() => {
  //   // if (data) {
  //   setShowTotal(true)
  //   // }
  // }, [data]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;


    setData((prev: {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      mensaje: string;
    }) => ({
      ...prev,
      [name]: value
    }))
  };


  useEffect(() => {
    if (formState.success) {
      setShowSuccessMessage(true);

      const timeout = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

      setShowTotal(true)

      return () => clearTimeout(timeout)
    }
  }, [formState.success])

  return (
    <form className="flex flex-col gap-5">
      <h1>¡Casi está lista tu cotización!</h1>
      <p>El valor
        <strong className="mx-[0.5ch]">
          TOTAL
        </strong>
        de los materiales que seleccionaste es de {numberToColombianPriceString(totalToShow)} de pesos colombianos.
      </p>
      <p>Si deseas verlo a detalle y recibir una asesoría personalizada solo
        <strong className="mx-[0.5ch]">
          ingresa los siguientes datos:
        </strong>
      </p>
      {selectedFormats && Object.keys(selectedFormats).map((surfaceId, index) => (
        <input
          key={index}
          type="hidden"
          name={`selectedSurfaces`}
          value={JSON.stringify({ ...selectedFormats[surfaceId], surfaceId })}
        />
      ))}
      <Input
        onChange={onInputChange}
        label="Nombre"
        name="nombre"
        value={data.nombre}
        autoComplete="given-name"
        required
        placeholder="Juan"
      />
      {formState.errors?.nombre && <p className="text-red-500">{formState.errors.nombre._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Apellido"
        name="apellido"
        value={data.apellido}
        autoComplete="family-name"
        required
        placeholder="Pérez"
      />
      {formState.errors?.apellido && <p className="text-red-500">{formState.errors.apellido._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Email"
        type="email"
        name="email"
        value={data.email}
        autoComplete="email"
        required
        placeholder="tunombre@incocivil.com"
      />
      {formState.errors?.email && <p className="text-red-500">{formState.errors.email._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Teléfono"
        name="telefono"
        value={data.telefono}
        autoComplete="tel"
        placeholder="300 123 4567"
        required
      />
      {formState.errors?.telefono && <p className="text-red-500">{formState.errors?.telefono._errors}</p>}
      <label className="flex flex-col gap-2">
        <h4>
          Mensaje (opcional):
        </h4>
        <textarea
          onChange={onInputChange}
          className={"px-2 py-1 rounded"}
          value={data.mensaje}
          name="mensaje"
          placeholder="Deja tu mensaje..."
        />
      </label>
      {formState.errors?.mensaje && <p className="text-red-500">{formState.errors?.mensaje._errors}</p>}

      <button disabled={isPending} formAction={formAction} className="bg-accent1 text-light px-4 sm:px-6 py-1.5 xs:py-2 text-sm sm:text-base w-fit self-end flex flex-col items-center justify-center rounded-lg text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow">
        {isPending ? "Enviando Cotización" : "Ver Cotización"}
      </button>
      {formState.success && showSuccessMessage && (
        <p className="text-center">✔️ Su cotización fue enviada exitosamente</p>
      )}
    </form>
  );
}

export default CaptureForm;

const Input = ({ className, label, ...rest }: ComponentPropsWithoutRef<"input"> & {
  label: string;
}) => {

  return (
    <label className="flex flex-col gap-2">
      <span className="text-gray-900">
        {label}:
      </span>
      <input {...rest} className={cn("bg-light border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3", className)} />
    </label>
  )
}