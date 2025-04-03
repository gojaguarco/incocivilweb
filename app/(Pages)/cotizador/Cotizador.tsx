"use client";

import {
  ALL_SURFACE_TYPES_QUERYResult,
  CATALOGO_QUERYResult,
  COTIZADOR_QUERYResult,
} from "@/sanity.types";
import LightCard from "../_components/LightCard";
import SelectFilter from "../_components/SelectFilter";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Suspense, useCallback, useState } from "react";
import SelectedSurfacesTable from "./SelectedSurfacesTable";
import CaptureInfo from "./CaptureInfo";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";

const CotizadorUi = ({
  surfaceTypes,
  catalogo,
  cotizadorContent,
}: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: CATALOGO_QUERYResult;
  cotizadorContent: COTIZADOR_QUERYResult;
}) => {
  const searchParams = useSearchParams();
  const captureInfoOpen = searchParams.get("capture-info") === "true";
  const surfaceTypeId = searchParams.get("surfaceType");
  const selectedSurfaceIds = searchParams.get("surfaceId")?.split(",") ?? [];

  const [showTotal, setShowTotal] = useState(false);

  const [surfaceFormats, setSurfaceFormats] = useState<{
    [surfaceId: string]: SurfaceToSendAdminEmail;
  }>(() => {
    const initialState: { [surfaceId: string]: SurfaceToSendAdminEmail } = {};
    for (const surfaceId of selectedSurfaceIds) {
      const surface = catalogo.find((item) => item._id === surfaceId);
      const area = surface?.formats
        ? (surface.formats[0].width * surface.formats[0].height) / 100
        : 0;
      const price = parseInt(surface?.price?.replaceAll(".", "") || "");
      const totalSurface = area * price;
      // console.log({ surface, area, price, totalSurface, priceString: surface?.price?.replaceAll(".", "") })
      initialState[surfaceId] = {
        width: surface?.formats ? surface.formats[0].width : 0,
        height: surface?.formats ? surface.formats[0].height : 0,
        totalSurface,
        code: surface?.code ? String(surface.code) : "",
        id: surface?._id || "",
        image: surface?.image ? urlFor(surface.image).url() : "",
        name: surface?.title || "",
      };
    }
    return initialState;
  });

  const router = useRouter();
  const filteredCatalogo = catalogo.filter((item) => {
    if (!surfaceTypeId) {
      return true;
    }
    if (surfaceTypeId === "all") {
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
      <LightCard>
        <div className="md:flex justify-between items-center gap-3">
          <h2 className="my-5 md:font-montserrat md:font-normal">
            {
              cotizadorContent?.cotizador?.surfaceSelection
                ?.surfaceTypeSelection
            }
          </h2>
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
      </LightCard>
      {surfaceTypeId && (
        <LightCard className="pr-0 flex flex-col gap-2">
          <h2 className="my-5 md:font-montserrat md:font-normal">
            {cotizadorContent?.cotizador?.surfaceSelection?.surfaceSelection}
          </h2>
          <div className="overflow-x-scroll no-scrollbar">
            <ul className="flex gap-4 w-fit pr-5">
              {filteredCatalogo.map((item) => (
                <li
                  key={item._id}
                  className="w-[200px] p-1 bg-light rounded-xl relative"
                >
                  {item.image ? (
                    <Image
                      className="rounded-lg w-full h-full object-cover"
                      src={urlFor(item.image)
                        .width(200)
                        .height(200)
                        .format("webp")
                        .url()}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-primary rounded-xl flex items-center justify-center">
                      <h2 className="text-4xl">📸</h2>
                    </div>
                  )}
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
                </li>
              ))}
            </ul>
          </div>
        </LightCard>
      )}
      {surfaceTypeId &&
        selectedSurfaceIds &&
        selectedSurfaceIds.length >= 1 && (
          <>
            <LightCard>
              <h2 className="my-5 md:font-montserrat md:font-normal">
                {cotizadorContent?.cotizador?.surfaceSelection?.formatSelection}
              </h2>
              <SelectedSurfacesTable
                showTotal={showTotal}
                surfaceFormats={surfaceFormats}
                setSurfaceFormats={setSurfaceFormats}
                catalogo={catalogo}
                removeSurfaceId={removeSurfaceId}
                selectedSurfaceIds={selectedSurfaceIds}
              />
            </LightCard>
            <div className="w-full items-center flex flex-col md:flex-row gap-2 justify-between">
              <LightCard>
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
              </LightCard>
              <CaptureInfo
                formTitle={
                  cotizadorContent?.cotizador?.formContent?.title || ""
                }
                successMessage={cotizadorContent?.cotizador?.formContent?.successMessage || ""}
                setShowTotal={setShowTotal}
                surfaceFormats={surfaceFormats}
                createQueryString={createQueryString}
                captureInfoOpen={captureInfoOpen}
              />
            </div>
          </>
        )}
    </section>
  );
};

const Cotizador = ({
  surfaceTypes,
  catalogo,
  cotizadorContent,
}: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: CATALOGO_QUERYResult;
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
