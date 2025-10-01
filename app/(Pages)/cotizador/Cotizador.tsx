"use client";

import {
  ALL_SURFACE_TYPES_QUERYResult,
  AVAILABLE_SURFACES_QUERYResult,
  COTIZADOR_QUERYResult,
} from "@/sanity.types";
import SelectFilter from "../_components/SelectFilter";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Suspense, useCallback, useState } from "react";
import CaptureInfo from "./CaptureInfo";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import SelectedSurfacesTable from "./SelectedSurfacesTable";
import {
  calculateTotalSurface,
  numberToColombianPriceString,
} from "@/app/helpers";

const CotizadorUi = ({
  surfaceTypes,
  catalogo,
  cotizadorContent,
}: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: AVAILABLE_SURFACES_QUERYResult;
  cotizadorContent: COTIZADOR_QUERYResult;
}) => {
  const searchParams = useSearchParams();
  const captureInfoOpen = searchParams.get("capture-info") === "true";
  const surfaceTypeId = searchParams.get("surfaceType");
  const selectedSurfaceIds = searchParams.get("surfaceId")?.split(",") ?? [];

  // const [showTotal, setShowTotal] = useState(false);

  const [surfaceFormats, setSurfaceFormats] = useState<{
    [surfaceId: string]: SurfaceToSendAdminEmail;
  }>(() => {
    const initialState: { [surfaceId: string]: SurfaceToSendAdminEmail } = {};
    for (const surfaceId of selectedSurfaceIds) {
      const surface = catalogo.find((item) => item._id === surfaceId);
      if (!surface) continue;

      const totalSurface =
        surface.formats && surface.formats[0] ? surface.formats[0].price : 0;
      initialState[surfaceId] = {
        quantity: 1,
        width: surface?.formats ? surface.formats[0].width : 0,
        height: surface?.formats ? surface.formats[0].height : 0,
        totalSurface,
        code: surface?.code ? String(surface.code) : "",
        id: surface?._id || "",
        image: surface?.image ? urlFor(surface.image).url() : "",
        name: surface?.title || "",
        formatPrice: surface?.formats ? surface.formats[0].price : 0,
        type: surface.type.title,
      };
    }
    return initialState;
  });

  const router = useRouter();
  const filteredCatalogo = catalogo.filter((item) => {
    if (!surfaceTypeId || surfaceTypeId === "all" || surfaceTypeId === "") {
      return true;
    }
    return item.type._id === surfaceTypeId;
  });

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

  const addSurfaceId = (id: string) => {
    const surface = catalogo.find((item) => item._id === id);
    const area = surface?.formats
      ? (surface.formats[0].width * surface.formats[0].height) / 100
      : 0;
    setSurfaceFormats((prev) => ({
      ...prev,
      [id]: {
        width: surface?.formats ? surface.formats[0].width : 0,
        height: surface?.formats ? surface.formats[0].height : 0,
        totalSurface: surface?.price
          ? parseInt(surface.price.replaceAll(".", "")) * area
          : 0,
        id: surface?._id || "",
        code: surface?.code ? String(surface.code) : "",
        name: surface?.title || "",
        image: surface?.image ? urlFor(surface.image).url() : "",
        quantity: 1,
        formatPrice: surface?.formats ? surface.formats[0].price : 0,
        type: surface?.type.title || "",
      },
    }));
    router.push(`?${createQueryString("surfaceId", id, "add")}`, {
      scroll: false,
    });
  };

  const removeSurfaceId = (id: string) => {
    if (selectedSurfaceIds.length === 1) {
      // remove surfaceId from url search params
      const params = new URLSearchParams(searchParams.toString());
      params.delete("surfaceId");
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      router.push(`?${createQueryString("surfaceId", id, "remove")}`, {
        scroll: false,
      });
    }
    setSurfaceFormats((prevSurfaceFormats) => {
      const updatedSurfaceFormats = { ...prevSurfaceFormats };
      delete updatedSurfaceFormats[id];
      return updatedSurfaceFormats;
    });
  };

  return (
    <section className="flex flex-col gap-[60px]">
      {/* <LightCard> */}
      <div className="md:flex justify-between items-center gap-3">
        <h3 className="my-5">
          {cotizadorContent?.cotizador?.surfaceSelection?.surfaceTypeSelection}{" "}
        </h3>
        <SelectFilter
          allTitle="Todos"
          filterName="surfaceType"
          className="text-lg"
          options={surfaceTypes.map((surface) => ({
            value: surface._id,
            label: surface.title,
          }))}
        />
      </div>
      {/* </LightCard> */}
      {/* {surfaceTypeId && ( */}
      {/* <LightCard className="pr-0 flex flex-col gap-2"> */}
      <div id="surface-selector" className="box-content scroll-mt-[50vh]">
        <h3 className="my-5">
          {cotizadorContent?.cotizador?.surfaceSelection?.surfaceSelection}
        </h3>
        <div className="overflow-x-scroll no-scrollbar">
          <ul className="flex gap-4 w-fit pr-5">
            {filteredCatalogo.map((item) => (
              <li
                key={item._id}
                className="w-[200px] p-1 bg-light rounded-xl relative flex flex-col"
              >
                {item.image ? (
                  <div className="relative">
                    <Image
                      className="rounded-lg w-full flex-grow object-cover"
                      src={urlFor(item.image)
                        .width(500)
                        .height(500)
                        .format("webp")
                        .url()}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                    <button
                      onClick={() => addSurfaceId(item._id)}
                      className="w-[50px] h-[50px] rounded-full absolute bottom-5 right-5 bg-white z-10 flex items-center justify-center"
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-[200px] h-[200px] bg-primary rounded-xl flex items-center justify-center">
                    <h3 className="text-4xl">📸</h3>
                  </div>
                )}
                <div className="p-1.5">
                  <h6 className="capitalize">
                    {item.title
                      .toLowerCase()
                      .replace(item.type.title.toLowerCase(), "")}
                  </h6>
                  <p>{item.type.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* </LightCard> */}
      {/* )} */}
      {/* {surfaceTypeId && ( */}
      <>
        {/* <LightCard> */}
        <section className="w-fit">
          <h3 className="my-5">
            {cotizadorContent?.cotizador?.surfaceSelection?.formatSelection}
          </h3>
          <SelectedSurfacesTable
            // showTotal={showTotal}
            surfaceFormats={surfaceFormats}
            setSurfaceFormats={setSurfaceFormats}
            catalogo={catalogo}
            removeSurfaceId={removeSurfaceId}
            selectedSurfaceIds={selectedSurfaceIds}
          />
          {/* {showTotal && ( */}
          <div className="bg-tableGray border rounded-b-md border-slate-300 px-5 py-5 text-right font-semibold">
            Total:
            {numberToColombianPriceString(
              calculateTotalSurface(Object.values(surfaceFormats))
            )}
          </div>
          {/* )} */}
        </section>
        {/* </LightCard> */}
        <div className="w-full items-center flex flex-col md:flex-row gap-2 justify-between">
          {/* <LightCard> */}
          <div className="">
            <h6 className="font-inter">
              {cotizadorContent?.cotizador?.surfaceSelection?.footer?.title}
            </h6>
            <a
              href={
                cotizadorContent?.cotizador?.surfaceSelection?.footer?.link
                  ?.link
              }
              className="underline"
            >
              {
                cotizadorContent?.cotizador?.surfaceSelection?.footer?.link
                  ?.title
              }
            </a>
          </div>
          {/* </LightCard> */}
          <CaptureInfo
            formTitle={cotizadorContent?.cotizador?.formContent?.title || ""}
            successMessage={
              cotizadorContent?.cotizador?.formContent?.successMessage || ""
            }
            // setShowTotal={setShowTotal}
            surfaceFormats={surfaceFormats}
            createQueryString={createQueryString}
            captureInfoOpen={captureInfoOpen}
          />
        </div>
      </>
      {/* )} */}
    </section>
  );
};

const Cotizador = ({
  surfaceTypes,
  catalogo,
  cotizadorContent,
}: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: AVAILABLE_SURFACES_QUERYResult;
  cotizadorContent: COTIZADOR_QUERYResult;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CotizadorUi
        cotizadorContent={cotizadorContent}
        catalogo={catalogo}
        surfaceTypes={surfaceTypes}
      />
    </Suspense>
  );
};

export default Cotizador;
