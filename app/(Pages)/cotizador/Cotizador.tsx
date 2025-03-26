"use client";

import {
  ALL_SURFACE_TYPES_QUERYResult,
  AVAILABLE_SURFACES_QUERYResult,
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
  catalogo: AVAILABLE_SURFACES_QUERYResult;
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
      if (!surface) continue;

      const totalSurface = surface.formats[0].price;
      // console.log({ surface, area, price, totalSurface, priceString: surface?.price?.replaceAll(".", "") })
      initialState[surfaceId] = {
        quanity: 1,
        width: surface?.formats ? surface.formats[0].width : 0,
        height: surface?.formats ? surface.formats[0].height : 0,
        totalSurface,
        code: surface?.code ? String(surface.code) : "",
        id: surface?._id || "",
        image: surface?.image ? urlFor(surface.image).url() : "",
        name: surface?.title || "",
        formatPrice: surface?.formats ? surface.formats[0].price : 0,
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
        quanity: 1,
        formatPrice: surface?.formats ? surface.formats[0].price : 0,
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
                  className="w-[200px] p-1 bg-light rounded-xl relative flex flex-col"
                >
                  {item.image ? (
                    <div className="relative">
                      <Image
                        className="rounded-lg w-full flex-grow object-cover"
                        src={urlFor(item.image)
                          .width(200)
                          .height(200)
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
                      <h2 className="text-4xl">📸</h2>
                    </div>
                  )}
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </LightCard>
      )}
      {surfaceTypeId &&
        selectedSurfaceIds &&
        selectedSurfaceIds.length >= 1 && (
          <LightCard>
            <h2 className="my-5 md:font-montserrat md:font-normal">
              3. Selecciona los formatos que necesitas para tu proyecto.
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Material</th>
                  <th className="text-left p-2">Código</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-left p-2">Calibre</th>
                  <th className="text-left p-2">Descripción</th>
                  <th className="text-left p-2">Precio</th>
                  <th className="text-left p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedSurfaceIds.map((id) => {
                  const surface = catalogo.find((item) => item._id === id);
                  if (!surface) return null;

                  return (
                    <tr key={id} className="border-b">
                      <td className="p-2">
                        {surface.image && (
                          <Image
                            className="rounded-lg w-[116.25px] h-[47px] object-cover"
                            src={urlFor(surface.image)
                              .width(116)
                              .height(47)
                              .format("webp")
                              .url()}
                            alt={surface.title}
                            width={116}
                            height={47}
                          />
                        )}
                        {surface.title}
                      </td>
                      <td className="p-2">{surface.code}</td>
                      <td className="p-2">{surface.type.title}</td>
                      <td className="p-2">{surface.caliber}</td>
                      <td className="p-2">{surface.description}</td>
                      <td className="p-2">{surface.price}</td>
                      <td className="p-2">
                        <button
                          onClick={() => removeSurfaceId(id)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7h16" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            <path d="M10 12l4 4m0 -4l-4 4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </LightCard>
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
