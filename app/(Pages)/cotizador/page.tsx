import { sanityFetch } from "@/sanity/lib/client";
import { ALL_SURFACE_TYPES_QUERY, CATALOGO_QUERY } from "@/sanity/queries/catalogoQueries";
import Cotizador from "./Cotizador";
import { COTIZADOR_QUERY } from "@/sanity/queries/cotizadorQueries";

const page = async () => {
  const surfaceTypes = await sanityFetch({
    query: ALL_SURFACE_TYPES_QUERY,
  });

  const catalogo = await sanityFetch({
    query: CATALOGO_QUERY,
  });

  const cotizadorContent = await sanityFetch({
    query: COTIZADOR_QUERY
  })

  return (
    <div className="bg-light w-full z-10">
      <section className="bg-light-dark md:bg-light min-h-screen w-full relative z-20 flex flex-col gap-5 py-10 px-5 md:px-10 max-w-6xl mx-auto">
        <header>
          <h1>
            {cotizadorContent?.cotizador?.surfaceSelection?.title}
          </h1>
          <p className="font-montserrat">{cotizadorContent?.cotizador?.surfaceSelection?.subtitle}</p>
        </header>
        <Cotizador cotizadorContent={cotizadorContent} surfaceTypes={surfaceTypes} catalogo={catalogo} />
      </section>
    </div>
  );
}

export default page;