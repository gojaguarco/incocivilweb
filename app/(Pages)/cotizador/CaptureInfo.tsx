"use client";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import LinkButton from "../_components/LinkButton";
import LightCard from "../_components/LightCard";
import CaptureForm from "./CaptureForm";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import { useCreateQueryString } from "../_lib/createQueryString";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (captureInfoOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [captureInfoOpen]);

  const handleClose = () => {
    router.push(`?${createQueryString("capture-info", "true", "remove")}`, {
      scroll: false,
    });
  };

  return (
    <>
      {Object.keys(surfaceFormats).length > 0 && (
        <LinkButton
          text={`Cotizar`}
          color="naranja"
          size="mediano"
          link={`?${createQueryString("capture-info", "true", "add")}`}
          scroll={false}
        />
      )}
      <dialog
        ref={dialogRef}
        onClick={handleClose}
        className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-none w-full h-full overflow-hidden"
      >
        <div className="pt-10 w-screen h-screen flex justify-center items-center">
          <LightCard
            onClick={(e) => e.stopPropagation()}
            className="max-w-[500px] md:max-w-screen-sm bg-light-dark overflow-x-hidden overflow-y-scroll md:overflow-y-auto max-h-[80svh] p-10 rounded-xl px-10 flex flex-col w-[85dvw] mx-auto gap-5"
          >
            <CaptureForm
              formTitle={formTitle}
              successMessage={successMessage}
              selectedFormats={surfaceFormats}
            />
          </LightCard>
        </div>
      </dialog>
    </>
  );
};

export default CaptureInfo;
