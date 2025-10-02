"use client";
// import { numberToColombianPriceString } from "@/app/helpers";
import {
  ComponentPropsWithoutRef,
  // Dispatch,
  // SetStateAction,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  // useRef,
  useState,
} from "react";
import { cn } from "../_lib/cn";
import { captureInfoAction } from "./captureInfoAction";
import { useRouter, useSearchParams } from "next/navigation";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import ReCAPTCHA from "react-google-recaptcha";
import PrivacyCheckBox from "../_components/PrivacyCheckBox";

const CaptureForm = ({
  // totalToShow,
  selectedFormats,
  // setShowTotal,
  formTitle,
  successMessage,
}: {
  // totalToShow: number;
  selectedFormats: {
    [surfaceId: string]: SurfaceToSendAdminEmail;
  };
  // setShowTotal: Dispatch<SetStateAction<boolean>>;
  formTitle: string;
  successMessage: string;
}) => {
  const recaptchaRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [privacyCheck, setPrivacyCheck] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [formState, formAction, isPending] = useActionState(captureInfoAction, {
    success: false,
    errors: null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [data, setData] = useState(() => {
    const savedData = localStorage && localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          mensaje: "",
        };
  });
  async function handleCaptchaSubmission(token: string | null) {
    if (token) {
      setIsVerified(true);
      setCaptchaToken(token);
    }
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setData(
      (prev: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        mensaje: string;
      }) => ({
        ...prev,
        [name]: value,
      })
    );
  };
  const createQueryString = useCallback(
    (
      name: string,
      value: string,
      action: "add" | "remove" | "replace" = "add"
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.get(name)?.split(",").filter(Boolean) || [];

      if (action === "add" && !currentValues.includes(value)) {
        params.set(name, [...currentValues, value].join(","));
      } else if (action === "remove") {
        params.set(name, currentValues.filter((v) => v !== value).join(","));
      } else if (action === "replace") {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (formState.success) {
      alert("Correo enviado.");

      setShowSuccessMessage(true);

      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
        router.push(`?${createQueryString("capture-info", "true", "remove")}`);
      }, 3000);

      // setShowTotal(true);

      return () => clearTimeout(timeout);
    }
  }, [formState.success]);

  return (
    <form className="flex flex-col gap-5">
      <h1>{formTitle}</h1>
      {/* <p>
        El valor
        <strong className="mx-[0.5ch]">TOTAL</strong>
        de los materiales que seleccionaste es de{" "}
        {numberToColombianPriceString(totalToShow)} de pesos colombianos.
      </p>
      <p>
        Si deseas verlo a detalle y recibir una asesoría personalizada solo
        <strong className="mx-[0.5ch]">ingresa los siguientes datos:</strong>
      </p> */}
      <p>
        Ingresa tus datos para recibir la cotización formal a tu correo
        electrónico y un asesor te contactará en breve
      </p>
      <input type="hidden" name="captchaToken" value={captchaToken || ""} />

      {selectedFormats &&
        Object.keys(selectedFormats).map((surfaceId, index) => (
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
      {formState.errors?.nombre && (
        <p className="text-red-500">{formState.errors.nombre._errors}</p>
      )}
      <Input
        onChange={onInputChange}
        label="Apellido"
        name="apellido"
        value={data.apellido}
        autoComplete="family-name"
        required
        placeholder="Pérez"
      />
      {formState.errors?.apellido && (
        <p className="text-red-500">{formState.errors.apellido._errors}</p>
      )}
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
      {formState.errors?.email && (
        <p className="text-red-500">{formState.errors.email._errors}</p>
      )}
      <Input
        onChange={onInputChange}
        label="Teléfono"
        name="telefono"
        value={data.telefono}
        autoComplete="tel"
        placeholder="300 123 4567"
        required
      />
      {formState.errors?.telefono && (
        <p className="text-red-500">{formState.errors?.telefono._errors}</p>
      )}
      <label className="flex flex-col gap-2">
        <h4>Mensaje (opcional):</h4>
        <textarea
          onChange={onInputChange}
          className={"px-2 py-1 rounded"}
          value={data.mensaje}
          name="mensaje"
          placeholder="Deja tu mensaje..."
        />
      </label>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaSubmission}
          ref={recaptchaRef}
        />
      )}
      <PrivacyCheckBox checked={privacyCheck} setChecked={setPrivacyCheck} />

      {formState.errors?.mensaje && (
        <p className="text-red-500">{formState.errors?.mensaje._errors}</p>
      )}
      {!formState.success && (
        <button
          disabled={!privacyCheck || !isVerified || isPending}
          formAction={formAction}
          className={`
            disabled:bg-accent1/50 disabled:hover:translate-y-0
            hover:-translate-y-0.5 hover:el-shadow
            bg-accent1 text-light px-4 sm:px-6 py-1.5 xs:py-2 text-sm sm:text-base w-fit self-end flex flex-col items-center justify-center rounded-lg text-nowrap flex-shrink-0
            `}
        >
          {isPending ? "Enviando Cotización" : "Ver Cotización"}
        </button>
      )}
      {formState.success && showSuccessMessage && (
        <p className="text-center text-lg">{successMessage}</p>
      )}
    </form>
  );
};

export default CaptureForm;

const Input = ({
  className,
  label,
  ...rest
}: ComponentPropsWithoutRef<"input"> & {
  label: string;
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-gray-900">{label}:</span>
      <input
        {...rest}
        className={cn(
          "bg-light border border-slate-300 text-gray-900 text-sm rounded-lg  focus-visible:outline-slate-500 block w-full py-2 px-3",
          className
        )}
      />
    </label>
  );
};
