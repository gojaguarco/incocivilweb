"use client";
import { CATALOGO_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import ItemCard from "../_components/ItemCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CatalogoUi = ({ catalogo }: {
  catalogo: CATALOGO_QUERYResult;
}) => {
  const searchParams = useSearchParams();

  const surfaceTypeId = searchParams.get("surfaceType");

  const filteredCatalogo = catalogo.filter((item) => {
    if (!surfaceTypeId) {
      return true;
    }
    if (surfaceTypeId === "all") {
      return true;
    }
    return item.type._id === surfaceTypeId;
  });
  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {filteredCatalogo.map((item) => {
        const title = item.title.toLowerCase().replace(item.type.title.toLowerCase(), "");
        return (
          <li key={item._id}>

            <ItemCard
              surfaceId={item._id}
              surfaceTypeId={item.type._id}
              title={title}
              description={item.type.title}
              image={item.image}
              imageAlt={item.title}
              availability={item.available}
            />
          </li>
        )
      })}
    </ul>
  );
}



const Catalogo = ({ catalogo }: {
  catalogo: CATALOGO_QUERYResult;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogoUi catalogo={catalogo} />
    </Suspense>
  )
};

export default Catalogo;