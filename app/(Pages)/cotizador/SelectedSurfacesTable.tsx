"use client";
import { AVAILABLE_SURFACES_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../_lib/cn";
import { numberToColombianPriceString } from "@/app/helpers";
import { SurfaceToSendAdminEmail } from "./captureInfoZods";
import NumberInput from "./NumberInput";
import SelectSurfaceButton from "./SelectSurfaceButton";

const SelectedSurfacesTable = ({
  catalogo,
  removeSurfaceId,
  surfaceFormats,
  onFormatChange,
  onQuantityChange,
}: {
  catalogo: AVAILABLE_SURFACES_QUERYResult;
  removeSurfaceId: (id: string) => void;
  surfaceFormats: { [key: string]: SurfaceToSendAdminEmail };
  onFormatChange: (
    cartItemKey: string,
    newFormat: { width: number; height: number }
  ) => void;
  onQuantityChange: (cartItemKey: string, quantity: number) => void;
}) => {
  const selectedItems = Object.keys(surfaceFormats);

  return (
    <div className="">
      {selectedItems && selectedItems.length > 0 ? (
        <table className="hidden xl:block table-fixed w-fit border-collapse bg-light rounded shadow-sm overflow-hidden">
          <thead className="w-full">
            <tr className="border-b">
              <Th className="border-r border-slate-300">Material</Th>
              <Th className="border-r border-slate-300">Código</Th>
              <Th className="border-r border-slate-300">Tipo</Th>
              <Th className="border-r border-slate-300">Calibre</Th>
              <Th className="border-r border-slate-300">Descripción</Th>
              <Th className="border-r border-slate-300">Precio m2</Th>
              <Th className="border-r border-slate-300">Formato</Th>
              <Th className="border-r border-slate-300">Cantidad</Th>
              <Th className="border-r border-slate-300">Total</Th>
            </tr>
          </thead>
          <tbody className="w-full">
            {selectedItems.map((cartKey, index) => {
              const surfaceId = cartKey.split("_")[0];
              const surface = catalogo.find((item) => item._id === surfaceId);
              if (!surface) return null;

              return (
                <DesktopSurface
                  cartItem={surfaceFormats[cartKey]}
                  key={cartKey}
                  id={cartKey}
                  index={index}
                  removeSurfaceId={removeSurfaceId}
                  surface={surface}
                  onFormatChange={onFormatChange}
                  onQuantityChange={onQuantityChange}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <section className="block">
          <div className="hidden lg:flex py-10 gap-10 justify-between px-10 w-full border-collapse bg-light rounded shadow-sm overflow-hidden">
            <h4>Material</h4>
            <h4>Código</h4>
            <h4>Tipo</h4>
            <h4>Calibre</h4>
            <h4>Descripción</h4>
            <h4>Precio m2</h4>
            <h4>Formato</h4>
            <h4>Cantidad</h4>
            <h4>Total</h4>
          </div>
          <div className="bg-tableGray p-10 grid place-content-center">
            <SelectSurfaceButton />
          </div>
        </section>
      )}
      <ul
        id=""
        className="xl:hidden w-full border-collapse bg-light rounded shadow-sm overflow-hidden flex flex-col"
      >
        {selectedItems.map((cartKey, index) => {
          const surfaceId = cartKey.split("_")[0];
          const surface = catalogo.find((item) => item._id === surfaceId);
          if (!surface) return null;
          return (
            <MobileSurface
              cartItem={surfaceFormats[cartKey]}
              key={cartKey}
              index={index}
              surface={surface}
              id={cartKey}
              removeSurfaceId={removeSurfaceId}
              onFormatChange={onFormatChange}
              onQuantityChange={onQuantityChange}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedSurfacesTable;

const Th = ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"th"> & {
  children: React.ReactNode;
}) => {
  return (
    <th
      className={cn("text-center p-2 md:py-5 border-slate-400", className)}
      {...rest}
    >
      <h4 className="font-semibold">{children}</h4>
    </th>
  );
};

const Td = ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"td"> & {
  children: React.ReactNode;
}) => {
  return (
    <td className={cn("p-2 md:p-5", className)} {...rest}>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </td>
  );
};

const DesktopSurface = ({
  id,
  index,
  surface,
  removeSurfaceId,
  cartItem,
  onFormatChange,
  onQuantityChange,
}: {
  id: string;
  index: number;
  surface: AVAILABLE_SURFACES_QUERYResult[number];
  removeSurfaceId: (id: string) => void;
  cartItem: SurfaceToSendAdminEmail;
  onFormatChange: (
    cartItemKey: string,
    newFormat: { width: number; height: number }
  ) => void;
  onQuantityChange: (cartItemKey: string, quantity: number) => void;
}) => {
  const rowBg = index % 2 === 0 ? "bg-tableGray" : "bg-light";
  return (
    <tr className={cn("border-b text-xs", rowBg)}>
      <Td className="border-r border-slate-300">
        {surface.image && (
          <Image
            className="rounded-lg w-[116.25px] h-[47px] object-cover"
            src={urlFor(surface.image).width(500).height(500).format("webp").url()}
            alt={surface.title}
            width={116}
            height={47}
          />
        )}
        <h6 className="capitalize text-xs self-start">
          {surface.title.toLowerCase().replace(surface.type.title.toLowerCase(), "")}
        </h6>
      </Td>
      <Td className="border-r border-slate-300 code">{surface.code}</Td>
      <Td className="border-r border-slate-300">{surface.type.title}</Td>
      <Td className="border-r border-slate-300">{surface.caliber}</Td>
      <Td className="border-r border-slate-300 max-w-[20ch] text-xs">
        {surface.description ?? "N/A"}
      </Td>
      <Td className="border-r border-slate-300">
        {surface.price ? `$${surface.price}` : "N/A"}
      </Td>
      <Td className="border-r border-slate-300">
        <select
          onChange={(e) => onFormatChange(id, JSON.parse(e.target.value))}
          value={JSON.stringify({
            width: cartItem.width,
            height: cartItem.height,
          })}
          className="p-2 rounded"
        >
          {surface.formats?.map((format, formatIndex) => {
            return (
              <option
                key={`${format.height}_${format.width}_${formatIndex}`}
                value={JSON.stringify({
                  width: format.width,
                  height: format.height,
                })}
              >
                {format.height}cm * {format.width}cm
              </option>
            );
          })}
        </select>
      </Td>
      <Td className="border-r border-slate-300">
        <NumberInput
          amount={cartItem.quantity}
          onChange={(quantity) => onQuantityChange(id, quantity)}
        />
      </Td>
      <Td className="border-r border-slate-300 relative">
        <span className="">
          {numberToColombianPriceString(cartItem.totalSurface || 0)}
        </span>
      </Td>
      <Td className="border-r border-slate-300">
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
      </Td>
    </tr>
  );
};

const MobileSurface = ({
  index,
  surface,
  removeSurfaceId,
  id,
  cartItem,
  onFormatChange,
  onQuantityChange,
}: {
  id: string;
  index: number;
  surface: AVAILABLE_SURFACES_QUERYResult[number];
  removeSurfaceId: (id: string) => void;
  cartItem: SurfaceToSendAdminEmail;
  onFormatChange: (
    cartItemKey: string,
    newFormat: { width: number; height: number }
  ) => void;
  onQuantityChange: (cartItemKey: string, quantity: number) => void;
}) => {
  const itemBg = index % 2 === 0 ? "bg-tableGray" : "bg-light";

  return (
    <li
      className={cn(
        "border-b border-slate-300 p-5 pb-8 relative flex flex-col",
        itemBg
      )}
    >
      {surface.image && (
        <Image
          className="rounded-lg w-full h-[150px] object-cover mb-5"
          src={urlFor(surface.image).width(1500).height(600).format("webp").url()}
          alt={surface.title}
          width={1500}
          height={600}
        />
      )}
      <div className="grid grid-cols-2 gap-2">
        <InfoItem>
          <strong>Título: </strong>
        </InfoItem>
        <InfoItem>
          {" "}
          <h6 className="capitalize">
            {surface.title.toLowerCase().replace(surface.type.title.toLowerCase(), "")}
          </h6>
        </InfoItem>
        <InfoItem className="code">
          <strong>Código: </strong>
        </InfoItem>
        <InfoItem className="code">{surface.code}</InfoItem>

        <InfoItem>
          <strong>Tipo de superficie: </strong>
        </InfoItem>
        <InfoItem>{surface.type.title}</InfoItem>
        <InfoItem>
          <strong>Calibre: </strong>
        </InfoItem>
        <InfoItem>{surface.caliber}</InfoItem>

        <InfoItem>
          <strong>Descripción: </strong>
        </InfoItem>
        <InfoItem>
          <div className="relative w-full group flex items-center">
            <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {surface.description ?? "N/A"}
            </p>
            <div className="absolute bg-white border rounded p-2 shadow-md z-10 hidden group-hover:block w-full left-0 top-full mt-2">
              {surface.description ?? "N/A"}
            </div>
            <div className="text-[0.6em] underline text-gray-500 whitespace-nowrap cursor-pointer">
              Ver más.
            </div>
          </div>
        </InfoItem>

        <InfoItem>
          <strong>Precio por m2:</strong>
        </InfoItem>
        <InfoItem> {surface.price ? `$${surface.price}` : "N/A"}</InfoItem>

        <InfoItem className="h-[39.2px]">
          <strong>Selecciona formato: </strong>
        </InfoItem>
        <InfoItem>
          <select
            onChange={(e) => onFormatChange(id, JSON.parse(e.target.value))}
            value={JSON.stringify({
              width: cartItem.width,
              height: cartItem.height,
            })}
            className="p-2 rounded"
          >
            {surface.formats?.map((format, index) => {
              return (
                <option
                  key={`<span class="math-inline">\{format\.height\}\*</span>{format.width}-${index}`}
                  value={JSON.stringify({
                    width: format.width,
                    height: format.height,
                  })}
                >
                  {format.height}cm * {format.width}cm
                </option>
              );
            })}
          </select>
        </InfoItem>

        <InfoItem className="">
          <strong>Selecciona Cantidad: </strong>
        </InfoItem>
        <InfoItem>
          <NumberInput
            amount={cartItem.quantity}
            onChange={(quantity) => onQuantityChange(id, quantity)}
          />
        </InfoItem>

        <InfoItem className="">
          <strong>Total: </strong>
        </InfoItem>

        <InfoItem className="relative">
          <span className="text-lg font-semibold">
            {numberToColombianPriceString(cartItem.totalSurface || 0)}
          </span>
        </InfoItem>
        <button
          onClick={() => removeSurfaceId(id)}
          className="p-2 text-red-500 hover:text-red-700 absolute z-20 bottom-0 right-0"
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
      </div>
    </li>
  );
};

const InfoItem = ({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex gap-[1ch] items-center", className)} {...rest}>
      {children}
    </div>
  );
};