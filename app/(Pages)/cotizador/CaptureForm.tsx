import { numberToColombianPriceString } from "@/app/helpers";
import { ComponentPropsWithoutRef, useActionState, useEffect, useState } from "react";
import { cn } from "../_lib/cn";
import { captureInfoAction } from "./captureInfoAction";



// const useLocalStorage = (key: string, initialValue: any) => {
//   const storedValue = localStorage.getItem(`incocivil-${key}`);
//   const initial = storedValue ? JSON.parse(storedValue) : initialValue;
//   const [value, setValue] = useState(initial);

//   useEffect(() => {
//     localStorage.setItem(`incocivil-${key}`, JSON.stringify(value));
//   }, [`incocivil-${key}`, value]);

//   return [value, setValue];
// };


const CaptureForm = ({ totalToShow }: {
  totalToShow: number;
}) => {

  const [state, formAction, isPending] = useActionState(captureInfoAction, {
    success: false,
    errors: null,
  });

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      mensaje: '',
    };
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem('formData', JSON.stringify(data));
    }
  }, [data]); 

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    const inputName = e.target.name;

    if (!value || !inputName) return;

    setData((prev: {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      mensaje: string;
    }) => ({
      ...prev,
      [inputName]: value
    }))
  };



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
      <Input
        onChange={onInputChange}
        label="Nombre"
        name="nombre"
        value={data.nombre}
        autoComplete="given-name"
        required
      />
      {state.errors?.nombre && <p className="text-red-500">{state.errors.nombre._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Apellido"
        name="apellido"
        value={data.apellido}
        autoComplete="family-name"
        required
      />
      {state.errors?.apellido && <p className="text-red-500">{state.errors.apellido._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Email"
        type="email"
        name="email"
        value={data.email}
        autoComplete="email"
        required
      />
      {state.errors?.email && <p className="text-red-500">{state.errors.email._errors}</p>}
      <Input
        onChange={onInputChange}
        label="Teléfono"
        name="telefono"
        value={data.telefono}
        autoComplete="tel"
        required
      />
      {state.errors?.telefono && <p className="text-red-500">{state.errors?.telefono._errors}</p>}
      <label className="flex flex-col gap-2">
        <h4>
          Mensaje (opcional):
        </h4>
        <textarea
          onChange={onInputChange}
          className={"px-2 py-1 rounded"}
          value={data.mensaje}
          name="mensaje"
        />
      </label>
      {state.errors?.mensaje && <p className="text-red-500">{state.errors?.mensaje._errors}</p>}

      <button disabled={isPending} formAction={formAction} className="bg-accent1 text-light px-4 sm:px-6 py-1.5 xs:py-2 text-sm sm:text-base w-fit self-end flex flex-col items-center justify-center rounded-lg text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow">
        {isPending ? "Enviando Cotización" : "Ver Cotización"}
      </button>
    </form>
  );
}

export default CaptureForm;

const Input = ({ className, label, ...rest }: ComponentPropsWithoutRef<"input"> & {
  label: string;
}) => {

  return (
    <label className="flex flex-col gap-2">
      <h4>
        {label}:
      </h4>
      <input {...rest} className={cn("px-2 py-1 rounded", className)} />
    </label>
  )
}