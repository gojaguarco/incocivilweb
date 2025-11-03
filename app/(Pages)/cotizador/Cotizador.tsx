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
import { Suspense, useMemo } from "react";
import CaptureInfo from "./CaptureInfo";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import SelectedSurfacesTable from "./SelectedSurfacesTable";
import {
  calculateTotalSurface,
  numberToColombianPriceString,
} from "@/app/helpers";
import "./Scroll.css";

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
  const router = useRouter();

  const surfaceFormats = useMemo(() => {
    const initialState: { [key: string]: SurfaceToSendAdminEmail } = {};
    const items = searchParams.get("items")?.split(":") ?? [];

    for (const item of items) {
      if (!item) continue;

      const parts = item.split("_");
      if (parts.length < 5) continue;

      const [surfaceId, width, height, uniqueId, quantity] = parts;

      const surface = catalogo.find((s) => s._id === surfaceId);
      if (!surface || !surface.formats) continue;

      const matchingFormat = surface.formats.find(
        (f) => f.width === Number(width) && f.height === Number(height)
      );

      if (!matchingFormat) continue;

      const cartItemKey = `${surfaceId}_${width}_${height}_${uniqueId}`;

      initialState[cartItemKey] = {
        quantity: Number(quantity),
        width: matchingFormat.width,
        height: matchingFormat.height,
        totalSurface: matchingFormat.price * Number(quantity),
        code: surface.code ? String(surface.code) : "",
        id: surface._id,
        image: surface.image ? urlFor(surface.image).url() : "",
        name: surface.title || "",
        formatPrice: matchingFormat.price,
        type: surface.type.title,
      };
    }

    return initialState;
  }, [searchParams, catalogo]);

  const addSurfaceId = (id: string, formatIndex: number = 0) => {
    const surface = catalogo.find((item) => item._id === id);
    if (!surface || !surface.formats || !surface.formats[formatIndex]) return;

    const selectedFormat = surface.formats[formatIndex];
    const uniqueId = Date.now().toString();
    const newItem = `${id}_${selectedFormat.width}_${selectedFormat.height}_${uniqueId}_1`;

    const params = new URLSearchParams(window.location.search);
    const items = params.get("items")?.split(":").filter(Boolean) || [];
    items.push(newItem);
    params.set("items", items.join(":"));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const removeSurfaceId = (cartItemKey: string) => {
    const params = new URLSearchParams(window.location.search);
    const items = params.get("items")?.split(":").filter(Boolean) || [];
    const updatedItems = items.filter((item) => !item.startsWith(cartItemKey));
    if (updatedItems.length === 0) {
      params.delete("items");
    } else {
      params.set("items", updatedItems.join(":"));
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onFormatChange = (
    cartItemKey: string,
    newFormat: { width: number; height: number }
  ) => {
    const params = new URLSearchParams(window.location.search);
    const items = params.get("items")?.split(":").filter(Boolean) || [];
    const itemIndex = items.findIndex((item) => item.startsWith(cartItemKey));

    if (itemIndex !== -1) {
      const parts = items[itemIndex].split("_");
      parts[1] = String(newFormat.width);
      parts[2] = String(newFormat.height);
      items[itemIndex] = parts.join("_");
    }

    params.set("items", items.join(":"));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onQuantityChange = (cartItemKey: string, quantity: number) => {
    const params = new URLSearchParams(window.location.search);
    const items = params.get("items")?.split(":").filter(Boolean) || [];
    const itemIndex = items.findIndex((item) => item.startsWith(cartItemKey));

    if (itemIndex !== -1) {
      const parts = items[itemIndex].split("_");
      parts[4] = String(quantity);
      items[itemIndex] = parts.join("_");
    }

    params.set("items", items.join(":"));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const surfaceTypeId = searchParams.get("surfaceType");
  const filteredCatalogo = catalogo.filter((item) => {
    if (!surfaceTypeId || surfaceTypeId === "all" || surfaceTypeId === "") {
      return true;
    }
    return item.type._id === surfaceTypeId;
  });

  return (
    <section className="flex flex-col gap-[60px]">
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
      <div id="surface-selector" className="box-content scroll-mt-[50vh]">
        <h3 className="my-5">
          {cotizadorContent?.cotizador?.surfaceSelection?.surfaceSelection}
        </h3>
        <div className="custom-scroll-fix overflow-x-scroll pb-2">
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
      <>
        <section className="w-fit">
          <h3 className="my-5">
            {cotizadorContent?.cotizador?.surfaceSelection?.formatSelection}
          </h3>
          <SelectedSurfacesTable
            surfaceFormats={surfaceFormats}
            catalogo={catalogo}
            removeSurfaceId={removeSurfaceId}
            onFormatChange={onFormatChange}
            onQuantityChange={onQuantityChange}
          />
          <div className="bg-tableGray border rounded-b-md border-slate-300 px-5 py-5 text-right font-semibold">
            Total:
            {numberToColombianPriceString(
              calculateTotalSurface(Object.values(surfaceFormats))
            )}
          </div>
        </section>
        <div className="w-full items-center flex flex-col md:flex-row gap-2 justify-between">
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
          <CaptureInfo
            searchParams={searchParams}
            formTitle={cotizadorContent?.cotizador?.formContent?.title || ""}
            successMessage={
              cotizadorContent?.cotizador?.formContent?.successMessage || ""
            }
            surfaceFormats={surfaceFormats}
            captureInfoOpen={searchParams.get("capture-info") === "true"}
          />
        </div>
      </>
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