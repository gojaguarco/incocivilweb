"use client";
import { useRouter } from "next/navigation";
import LinkButton from "../_components/LinkButton";
import LightCard from "../_components/LightCard";
import CaptureForm from "./CaptureForm";
import { SurfaceFormat } from "./Cotizador";

const CaptureInfo = ({
  createQueryString,
  captureInfoOpen,
  surfaceFormats
}: {
  surfaceFormats: {
    [surfaceId: string]: SurfaceFormat;
  }
  createQueryString: (name: string, value: string, action: 'add' | 'remove' | 'replace') => string;
  captureInfoOpen: boolean;
}) => {
  const router = useRouter();

  let total = 0;

  for (const surfaceFormatIn in surfaceFormats) {


    const surfaceFormat = surfaceFormats[surfaceFormatIn]
    console.log({surfaceFormat, surfaceFormats, surfaceFormatIn})
    total += surfaceFormat.totalSurface;
  }
  return (
    <>
      <LinkButton
        // scroll={false}
        text={`Cotizar ${total}`}
        color="naranja"
        size="mediano"
        link={`?${createQueryString("capture-info", "true", "add")}`}
      />
      {captureInfoOpen && (
        <section
          onClick={() => {
            router.push(`?${createQueryString("capture-info", "true", "remove")}`, { scroll: false })
          }}
          className="absolute top-0 z-[200] left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >

          <LightCard
            onClick={e => e.stopPropagation()}
            className="max-w-screen-sm bg-light-dark p-10 relative z-[200] rounded-xl px-10 flex flex-col w-[85dvw] mx-auto gap-5"
          >
            <CaptureForm totalToShow={total} />
          </LightCard>
        </section>
      )}
    </>
  );
}

export default CaptureInfo;


