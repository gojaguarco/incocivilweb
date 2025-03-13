"use client";
import { CATALOGO_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ComponentPropsWithoutRef, Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "../_lib/cn";
import { numberToColombianPriceString } from "@/app/helpers";
import { SurfaceFormat } from "./Cotizador";


const SelectedSurfacesTable = ({
  catalogo,
  removeSurfaceId,
  selectedSurfaceIds,
  setSurfaceFormats,
  surfaceFormats
}: {

  selectedSurfaceIds: string[];
  catalogo: CATALOGO_QUERYResult;
  removeSurfaceId: (id: string) => void;
  surfaceFormats: {
    [surfaceId: string]: SurfaceFormat;
  };
  setSurfaceFormats: Dispatch<SetStateAction<{
    [surfaceId: string]: SurfaceFormat;
  }>>


}) => {
  const [totals, setTotals] = useState<number[]>([]);


  useEffect(() => {
    for (const surfaceId of selectedSurfaceIds) {
      const surface = catalogo.find((item) => item._id === surfaceId);
      const surfacePriceInNumber = parseInt(surface?.price?.replaceAll(".", "").replace("$", "") || "")
      const areaPrice = surface?.formats && (surface?.formats[0].height * surface.formats[0].width) / 100
      const surfaceTotal = surfacePriceInNumber * (areaPrice || 0);
      setTotals([...totals, surfaceTotal])
    }
  }, [selectedSurfaceIds])


  return (
    <>
      <table id="selected-surfaces" className="hidden md:block table-fixed w-full border-collapse bg-light rounded shadow-sm overflow-hidden">
        <thead className="w-full">
          <tr className="border-b">
            <Th>Material</Th>
            <Th>Código</Th>
            <Th>Tipo</Th>
            <Th>Calibre</Th>
            <Th>Descripción</Th>
            <Th>Precio m2</Th>
            <Th>Formato</Th>
            <Th className="">Total</Th>
            {/* <Th>Acciones</Th> */}
          </tr>
        </thead>
        <tbody className="w-full">
          {selectedSurfaceIds.map((id, index) => {

            const surface = catalogo.find((item) => item._id === id);
            if (!surface) return null;

            return (
              <DesktopSurface surfaceFormats={surfaceFormats} setSurfaceFormats={setSurfaceFormats} totals={totals} setTotals={setTotals} key={id} id={id} index={index} removeSurfaceId={removeSurfaceId} surface={surface} />
            );
          })}
        </tbody>
      </table >
      <ul id="selected-surfaces" className="md:hidden w-full border-collapse bg-light rounded shadow-sm overflow-hidden flex flex-col">
        {selectedSurfaceIds.map((id, index) => {
          const surface = catalogo.find((item) => item._id === id);
          if (!surface) return null;
          return (
            <MobileSurface setSurfaceFormats={setSurfaceFormats} surfaceFormats={surfaceFormats} totals={totals} setTotals={setTotals} key={id} index={index} surface={surface} id={id} removeSurfaceId={removeSurfaceId} />
          )
        })}
      </ul>
      {/* {JSON.stringify(selectedSurfaces)} */}
    </>
  );
}

export default SelectedSurfacesTable;


const Th = ({ className, children, ...rest }: ComponentPropsWithoutRef<"th"> & {
  children: React.ReactNode;
}) => {
  return (
    <th className={cn("text-center p-2 md:py-5", className)} {...rest}>
      <h4 className="font-normal">
        {children}
      </h4>
    </th>
  )
};

const Td = ({ className, children, ...rest }: ComponentPropsWithoutRef<"td"> & {
  children: React.ReactNode;
}) => {
  return (
    <td className={cn("p-2 md:p-5", className)} {...rest}>
      <div className="flex flex-col items-center justify-center">

        {children}
      </div>
    </td>
  )
}

const DesktopSurface = ({
  id,
  index,
  surface,
  removeSurfaceId,
  setSurfaceFormats,
  surfaceFormats
}: {
  id: string;
  index: number;
  surface: CATALOGO_QUERYResult[number];
  removeSurfaceId: (id: string) => void;
  setTotals: Dispatch<SetStateAction<number[]>>
  totals: number[];
  surfaceFormats: {
    [surfaceId: string]: SurfaceFormat
  }
  setSurfaceFormats: Dispatch<SetStateAction<{
    [surfaceId: string]: SurfaceFormat;
  }>>

}) => {

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = JSON.parse(e.target.value);
    if (format) {
      const area = (format.height * format.width) / 100;

      setSurfaceFormats({
        ...surfaceFormats,
        [surface._id]: {
          height: format.height,
          width: format.width,
          totalSurface: area * Number(surface.price?.replace(".", "") || 0)
        }
      })
    }
  };

  const rowBg = (index % 2 === 0 ? "bg-tableGray" : "bg-light")
  return (
    <tr className={cn("border-b", rowBg)}>
      <Td>
        {surface.image && <Image className="rounded-lg w-[116.25px] h-[47px] object-cover" src={urlFor(surface.image).width(116).height(47).format('webp').url()} alt={surface.title} width={116} height={47} />}
        {surface.title}
      </Td>
      <Td className="code">{surface.code}</Td>
      <Td>{surface.type.title}</Td>
      <Td>{surface.caliber}</Td>
      <Td className="max-w-[20ch]">{surface.description}</Td>
      <Td>${surface.price}</Td>
      <Td>
        <select onChange={onChange} value={JSON.stringify({ height: surfaceFormats[surface._id]?.height || 0, width: surfaceFormats[surface._id]?.width || 0 })} className="p-2 rounded">
          {surface.formats?.map((format, index) => {
            console.log(JSON.stringify(format), 'Option Value'); // Log option value
            return (
              <option key={`<span class="math-inline">\{format\.height\}\*</span>{format.width}-${index}`} value={JSON.stringify(format)}>{format.height}cm * {format.width}cm</option>
            );
          })}
        </select>
      </Td>
      <Td className="relative">
        <div className={`w-full h-full absolute z-10 top-0 left-0 ${rowBg}`}></div>
        <span className="">{numberToColombianPriceString(surfaceFormats[surface._id].totalSurface)}</span>
      </Td>
      <Td>
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
      </Td>
    </tr>
  )
}

const MobileSurface = ({ index, surface, removeSurfaceId, id, setSurfaceFormats, surfaceFormats }: {
  id: string;
  index: number;
  surface: CATALOGO_QUERYResult[number];
  removeSurfaceId: (id: string) => void;
  setTotals: Dispatch<SetStateAction<number[]>>
  totals: number[];
  surfaceFormats: {
    [surfaceId: string]: SurfaceFormat
  }
  setSurfaceFormats: Dispatch<SetStateAction<{
    [surfaceId: string]: SurfaceFormat;
  }>>

}) => {

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = JSON.parse(e.target.value);
    if (format) {
      const area = (format.height * format.width) / 100;

      setSurfaceFormats({
        ...surfaceFormats,
        [surface._id]: {
          height: format.height,
          width: format.width,
          totalSurface: area * Number(surface.price?.replace(".", "") || 0)
        }
      })
    }
  };
  const itemBg = (index % 2 === 0 ? "bg-tableGray" : "bg-light");

  return (
    <li className={cn("border-b p-5 pb-8 relative flex flex-col", itemBg)}>

      {surface.image && <Image className="rounded-lg w-full h-[150px] object-cover mb-5"
        src={urlFor(surface.image).width(500).height(300).format('webp').url()}
        alt={surface.title}
        width={500}
        height={300}
      />}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <InfoItem><strong>Título: </strong></InfoItem>
          <InfoItem className="code"><strong>Código: </strong></InfoItem>
          <InfoItem><strong>Tipo de superficie: </strong></InfoItem>
          <InfoItem><strong>Calibre: </strong></InfoItem>
          <InfoItem ><strong>Descripción: </strong></InfoItem>
          <InfoItem><strong>Precio por m2:</strong></InfoItem>
          <InfoItem className="h-[39.2px]"><strong>Selecciona formato: </strong></InfoItem>
          <InfoItem className=""><strong>Total: </strong></InfoItem>
        </div>
        <div className="flex flex-col gap-2">
          <InfoItem>{surface.title}</InfoItem>
          <InfoItem className="code">{surface.code}</InfoItem>
          <InfoItem>{surface.type.title}</InfoItem>
          <InfoItem>{surface.caliber}</InfoItem>
          <InfoItem>
            <div className="relative w-full group flex items-center">
              <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {surface.description}
              </p>
              <div className="absolute bg-white border rounded p-2 shadow-md z-10 hidden group-hover:block w-full left-0 top-full mt-2">
                {surface.description}
              </div>
              <div className="text-[0.6em] underline text-gray-500 whitespace-nowrap cursor-pointer">
                Ver más.
              </div>
            </div>
          </InfoItem>
          <InfoItem>${surface.price}</InfoItem>
          <InfoItem>
            <select onChange={onChange} value={JSON.stringify({ height: surfaceFormats[surface._id]?.height || 0, width: surfaceFormats[surface._id]?.width || 0 })} className="p-2 rounded">
              {surface.formats?.map((format, index) => {
                console.log(JSON.stringify(format), 'Option Value'); // Log option value
                return (
                  <option key={`<span class="math-inline">\{format\.height\}\*</span>{format.width}-${index}`} value={JSON.stringify(format)}>{format.height}cm * {format.width}cm</option>
                );
              })}
            </select>
          </InfoItem>

          <InfoItem className="relative">
            <div className={`w-full h-full absolute z-10 top-0 left-0 ${itemBg}`}></div>
            <span className="">{numberToColombianPriceString(surfaceFormats[surface._id].totalSurface)}</span>
          </InfoItem>
        </div>
        <button
          onClick={() => removeSurfaceId(id)}
          className="p-2 text-red-500 hover:text-red-700 absolute z-20 bottom-0 right-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7h16" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            <path d="M10 12l4 4m0 -4l-4 4" />
          </svg>
        </button>
      </div>
    </li>
  )
}

const InfoItem = ({ children, className, ...rest }: ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex gap-[1ch] items-center", className)} {...rest}>
      {children}
    </div>
  )
}