"use client";
import { CATALOGO_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import ItemCard from "../_components/ItemCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CatalogoUl = ({ catalogo }: {
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
    <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredCatalogo.map((item) => (
        <li key={item._id}>
          <Link scroll={false} href={`/surface-type/${item.type._id}`} >
            <ItemCard
              title={item.title}
              description={item.type.title}
              image={item.image}
              imageAlt={item.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}



const Catalogo = ({ catalogo }: {
  catalogo: CATALOGO_QUERYResult;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogoUl catalogo={catalogo} />
    </Suspense>
  )
};

export default Catalogo;