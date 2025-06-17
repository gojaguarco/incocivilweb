import { sanityFetch } from "@/sanity/lib/client";
import {
  ALL_SURFACE_TYPES_QUERY,
  AVAILABLE_SURFACES_QUERY,
} from "@/sanity/queries/catalogoQueries";
import Cotizador from "./Cotizador";
import { COTIZADOR_QUERY } from "@/sanity/queries/cotizadorQueries";
import LinkButton from "../_components/LinkButton";

const page = async () => {
  const surfaceTypes = await sanityFetch({
    query: ALL_SURFACE_TYPES_QUERY,
  });

  const catalogo = await sanityFetch({
    query: AVAILABLE_SURFACES_QUERY,
  });

  const cotizadorContent = await sanityFetch({
    query: COTIZADOR_QUERY,
  });
  const availableSurfaceTypeIds = new Set<string>();

  // Filter the catalog to get only available surfaces and extract their type IDs
  catalogo.forEach((surface) => {
    if (surface.available && surface.type && surface.type._id) {
      availableSurfaceTypeIds.add(surface.type._id);
    }
  });
  const availableSurfaceTypes = surfaceTypes.filter((surfaceType) =>
    availableSurfaceTypeIds.has(surfaceType._id)
  );

  return (
    <div className="w-full z-10">
      <section className="bg-light-dark min-h-screen w-full relative z-20 flex flex-col gap-5 py-10 px-5 md:px-10 xl:px-48 mx-auto">
        <header>
          <h1>{cotizadorContent?.cotizador?.surfaceSelection?.title}</h1>
          <p className="font-montserrat">
            {cotizadorContent?.cotizador?.surfaceSelection?.subtitle}
          </p>
          <LinkButton
            text={"Reiniciar Calculadora"}
            size="mediano"
            color="naranja"
            link="/cotizador"
            className="w-fit mt-2"
          />
        </header>
        <Cotizador
          cotizadorContent={cotizadorContent}
          surfaceTypes={availableSurfaceTypes}
          catalogo={catalogo}
        />
      </section>
    </div>
  );
};

export default page;
