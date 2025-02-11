import { useRouter } from "next/navigation";
import LinkButton from "../_components/LinkButton";
import { ComponentPropsWithoutRef } from "react";
import LightCard from "../_components/LightCard";
import { cn } from "../_lib/cn";

const CaptureInfo = ({
  createQueryString,
  captureInfoOpen,
  total
}: {
  createQueryString: (name: string, value: string, action: 'add' | 'remove' | 'replace') => string;
  captureInfoOpen: boolean;
  total: number;
}) => {
  const router = useRouter();
  return (
    <>
      <LinkButton scroll={false} text="Cotizar" color="naranja" size="mediano" link={`?${createQueryString("capture-info", "true", "add")}`} />
      {captureInfoOpen && (
        <section
          onClick={(e) => {
            router.back()
          }}
          className="fixed top-0 z-10 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >

          <LightCard
            onClick={e => e.stopPropagation()}
            className="bg-light-dark p-10 relative z-[200] rounded-md px-10 flex flex-col w-[85dvw] h-[75dvh] lg:h-[85dvh] mx-auto gap-5"
          >
            <form className="flex flex-col gap-5">

              <h1>¡Casi está lista tu cotización!</h1>
              <p>El valor
                <strong className="mx-[0.5ch]">
                  TOTAL
                </strong>
                de los materiales que seleccionaste es de ${total} de pesos colombianos.
              </p>
              <p>Si deseas verlo a detalle y recibir una asesoría personalizada solo
                <strong className="mx-[0.5ch]">
                  ingresa los siguientes datos:
                </strong>
              </p>
              <Input label="Nombre" type="text" />
              <Input label="Apellido" type="text" />
              <Input label="Email" type="text" />
              <Input label="Teléfono" type="text" />
              <Input label="Mensaje (opcional)" type="text" />
              <label className="flex flex-col gap-2">
                <h4>
                  Mensaje (opcional):
                </h4>
                <textarea className={"px-2 py-1 rounded"} />
              </label>
              <LinkButton text="Ver Cotización" color="naranja" size="mediano" link="/cotizador/confirmacion" className="w-fit self-end" />
            </form>
          </LightCard>
        </section>
      )}
    </>
  );
}

export default CaptureInfo;


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