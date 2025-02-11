import { CATALOGO_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { cn } from "../_lib/cn";
import { numberToColombianPriceString } from "@/app/helpers";


const SelectedSurfacesTable = ({
  catalogo,
  removeSurfaceId,
  selectedSurfaceIds
}: {
  selectedSurfaceIds: string[];
  catalogo: CATALOGO_QUERYResult;
  removeSurfaceId: (id: string) => void;
}) => {
  return (
    <table className="w-full border-collapse bg-white rounded shadow-sm">
      <thead>
        <tr className="border-b">
          <Th>Material</Th>
          <Th>Código</Th>
          <Th>Tipo</Th>
          <Th>Calibre</Th>
          <Th>Descripción</Th>
          <Th>Precio m2</Th>
          <Th>Formato</Th>
          <Th>Total</Th>
          {/* <Th>Acciones</Th> */}
        </tr>
      </thead>
      <tbody>
        {selectedSurfaceIds.map((id, index) => {

          const surface = catalogo.find((item) => item._id === id);
          if (!surface) return null;

          return (
            <Tr key={id} id={id} index={index} removeSurfaceId={removeSurfaceId} surface={surface} />
          );
        })}
      </tbody>
    </table >
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

const Tr = ({
  id,
  index,
  surface,
  removeSurfaceId
}: {
  id: string;
  index: number;
  surface: CATALOGO_QUERYResult[number];
  removeSurfaceId: (id: string) => void;
}) => {
  const [selectedFormatArea, setSelectedFormatArea] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [height, widthWithCm] = value.split('cm * ');
    const width = widthWithCm.replace('cm', '');
    const cm2 = parseInt(height) * parseInt(width);
    const m2 = cm2 / 100

    setSelectedFormat(value)
    setSelectedFormatArea(m2);
  }
  useEffect(() => {
    if (surface.formats) {

      const defaultHeight = surface.formats[0].height;
      const defaultWidth = surface.formats[0].width;

      const cm2 = defaultHeight * defaultWidth;
      const m2 = cm2 / 100

      setSelectedFormat(`${defaultHeight}cm * ${defaultWidth}cm`);

      setSelectedFormatArea(m2);
    }
  }, [])

  return (
    <tr className={cn("border-b", (index % 2 === 0 ? "bg-tableGray" : ""))}>
      <Td>
        {surface.image && <Image className="rounded-lg w-[116.25px] h-[47px] object-cover" src={urlFor(surface.image).width(116).height(47).format('webp').url()} alt={surface.title} width={116} height={47} />}
        {surface.title}
      </Td>
      <Td>{surface.code}</Td>
      <Td>{surface.type.title}</Td>
      <Td>{surface.caliber}</Td>
      <Td className="max-w-[20ch]">{surface.description}</Td>
      <Td>${surface.price}</Td>
      <Td>
        <select onChange={onChange} value={selectedFormat || ''} className="p-2 rounded">
          {surface.formats?.map((format, index) => (
            <option key={`${format.height}*${format.width}-${index}`} value={`${format.height}cm * ${format.height}cm`}>{format.height}cm * {format.height}cm</option>
          ))}
        </select>
      </Td>
      <Td className="surface-total">{surface.price && selectedFormatArea && numberToColombianPriceString((selectedFormatArea) * parseInt(surface.price.replaceAll(".", "")))}</Td>
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