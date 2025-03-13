import { sanityFetch } from "@/sanity/lib/client";
import { ALL_SURFACE_TYPES_QUERY, CATALOGO_QUERY } from "@/sanity/queries/catalogoQueries";
import Cotizador from "./Cotizador";

const page = async () => {
  const surfaceTypes = await sanityFetch({
    query: ALL_SURFACE_TYPES_QUERY,
  });

  const catalogo = await sanityFetch({
    query: CATALOGO_QUERY,
  });


  return (
    <section className="bg-light-dark md:bg-light w-full relative z-20 flex flex-col gap-5 py-10 px-5 md:px-10 max-w-6xl mx-auto">
      <header>
        <h1>
          Cotiza tu proyecto
        </h1>
        <p className="font-montserrat">EN 3 SIMPLES PASOS</p>
      </header>
      <Cotizador surfaceTypes={surfaceTypes} catalogo={catalogo} />
    </section>
  );
}

export default page;