"use client";
import { useRouter } from "next/navigation";
import LinkButton from "../_components/LinkButton";
import LightCard from "../_components/LightCard";
import CaptureForm from "./CaptureForm";
// import { Dispatch, SetStateAction } from "react";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";

const CaptureInfo = ({
  createQueryString,
  captureInfoOpen,
  surfaceFormats,
  // setShowTotal,
  formTitle,
  successMessage,
}: {
  surfaceFormats: {
    [surfaceId: string]: SurfaceToSendAdminEmail;
  };
  createQueryString: (
    name: string,
    value: string,
    action: "add" | "remove" | "replace"
  ) => string;
  captureInfoOpen: boolean;
  // setShowTotal: Dispatch<SetStateAction<boolean>>;
  formTitle: string;
  successMessage: string;
}) => {
  const router = useRouter();

  // let total = 0;

  // for (const surfaceFormatIn in surfaceFormats) {
  // const surfaceFormat = surfaceFormats[surfaceFormatIn];
  // total += surfaceFormat.totalSurface;
  // }
  return (
    <>
      {Object.keys(surfaceFormats).length > 0 && (
        <LinkButton
          // scroll={false}
          text={`Cotizar`}
          color="naranja"
          size="mediano"
          link={`?${createQueryString("capture-info", "true", "add")}`}
          scroll={false}
        />
      )}
      {captureInfoOpen && (
        <section
          onClick={() => {
            router.push(
              `?${createQueryString("capture-info", "true", "remove")}`,
              { scroll: false }
            );
          }}
          className="fixed top-0 z-[100] left-0 w-screen h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <LightCard
            onClick={(e) => e.stopPropagation()}
            className="max-w-screen-sm bg-light-dark p-10 relative z-[200] rounded-xl px-10 flex flex-col w-[85dvw] mx-auto gap-5"
          >
            <CaptureForm
              formTitle={formTitle}
              successMessage={successMessage}
              // setShowTotal={setShowTotal}
              selectedFormats={surfaceFormats}
              // totalToShow={total}
            />
          </LightCard>
        </section>
      )}
    </>
  );
};

export default CaptureInfo;
