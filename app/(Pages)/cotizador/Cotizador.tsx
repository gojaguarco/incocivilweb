"use client";

import { ALL_SURFACE_TYPES_QUERYResult, CATALOGO_QUERYResult } from "@/sanity.types";
import LightCard from "../_components/LightCard";
import SelectFilter from "../_components/SelectFilter";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Suspense, useCallback } from "react";

const CotizadorUi = ({ surfaceTypes, catalogo }: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: CATALOGO_QUERYResult;
}) => {
  const searchParams = useSearchParams();
  const surfaceTypeId = searchParams.get("surfaceType");
  const selectedSurfaceIds = searchParams.get("surfaceId")?.split(",") ?? []
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
    (name: string, value: string, action: 'add' | 'remove' | 'replace' = 'add') => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValues = params.get(name)?.split(',').filter(Boolean) || []

      if (action === 'add' && !currentValues.includes(value)) {
        params.set(name, [...currentValues, value].join(','))
      } else if (action === 'remove') {
        params.set(name, currentValues.filter(v => v !== value).join(','))
      } else if (action === "replace") {
        params.set(name, value)
      };

      return params.toString()
    },
    [searchParams]
  )


  const addSurfaceId = (id: string) => {
    router.push(`?${createQueryString('surfaceId', id, 'add')}`, {scroll: false})
  }

  const removeSurfaceId = (id: string) => {
    if (selectedSurfaceIds.length === 1) {
      // remove surfaceId from url search params
      const params = new URLSearchParams(searchParams.toString());
      params.delete('surfaceId');
      router.push(`?${params.toString()}`, {scroll: false});
    } else {
      router.push(`?${createQueryString('surfaceId', id, 'remove')}`, {scroll: false});
    }
  }

  return (
    <>
      <LightCard>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-light">
            1. Selecciona el tipo de superficie.
          </h2>
          <SelectFilter
            allTitle="Todos"
            filterName="surfaceType"
            options={surfaceTypes.map(surface => ({
              value: surface._id,
              label: surface.title
            }))}
          />
        </div>
      </LightCard>
      {surfaceTypeId && (
        <LightCard className="pr-0 flex flex-col gap-2">
          <h2 className="text-lg font-light font-montserrat">2. Selecciona las superficies que deseas cotizar.</h2>
          <div className="overflow-x-scroll no-scrollbar">
            <ul className="flex gap-4 w-fit">
              {filteredCatalogo.map((item) => (
                <li key={item._id} className="w-[200px] p-1 bg-light rounded-xl relative">
                  {item.image ? <Image className="rounded-lg w-full h-full object-cover" src={urlFor(item.image).width(200).height(200).format('webp').url()} alt={item.title} width={200} height={200} /> : (
                    <div className="w-[200px] h-[200px] bg-primary rounded-xl flex items-center justify-center">
                      <h2 className="text-4xl">📸</h2>
                    </div>
                  )}
                  <button onClick={() => addSurfaceId(item._id)} className="w-[50px] h-[50px] rounded-full absolute bottom-5 right-5 bg-white z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </LightCard>
      )}
      {surfaceTypeId && selectedSurfaceIds && selectedSurfaceIds.length >= 1 && (
        <LightCard>
          <h2 className="text-lg font-light">
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
                      {surface.image && <Image className="rounded-lg w-[116.25px] h-[47px] object-cover" src={urlFor(surface.image).width(116).height(47).format('webp').url()} alt={surface.title} width={116} height={47} />}
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
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
    </>
  );
}

const Cotizador = ({ surfaceTypes, catalogo }: {
  surfaceTypes: ALL_SURFACE_TYPES_QUERYResult;
  catalogo: CATALOGO_QUERYResult;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CotizadorUi catalogo={catalogo} surfaceTypes={surfaceTypes} />
    </Suspense>

  )
}

export default Cotizador;