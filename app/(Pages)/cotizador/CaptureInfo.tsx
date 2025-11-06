"use client";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import LinkButton from "../_components/LinkButton";
import LightCard from "../_components/LightCard";
import CaptureForm from "./CaptureForm";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import { useCreateQueryString } from "../_lib/createQueryString";
import { useEffect } from "react";

const CaptureInfo = ({
  captureInfoOpen,
  surfaceFormats,
  formTitle,
  successMessage,
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
  surfaceFormats: {
    [surfaceId: string]: SurfaceToSendAdminEmail;
  };
  captureInfoOpen: boolean;
  formTitle: string;
  successMessage: string;
}) => {
  const router = useRouter();
  const createQueryString = useCreateQueryString(searchParams);

  // let total = 0;

  // for (const surfaceFormatIn in surfaceFormats) {
  // const surfaceFormat = surfaceFormats[surfaceFormatIn];
  // total += surfaceFormat.totalSurface;
  // }

  useEffect(() => {
    if (captureInfoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [captureInfoOpen]);

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
          style={{ zIndex: 1000 }}
          className="pt-10 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
        >
          <LightCard
            onClick={(e) => e.stopPropagation()}
            className="max-w-[500px] md:max-w-screen-sm bg-light-dark overflow-x-hidden overflow-y-scroll md:overflow-y-auto max-h-[80svh] p-10 fixed z-[200] rounded-xl px-10 flex flex-col w-[85dvw] mx-auto gap-5"
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
