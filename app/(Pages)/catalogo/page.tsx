import { sanityFetch } from "@/sanity/lib/client";
import { ALL_SURFACE_TYPES_QUERY, CATALOGO_QUERY } from "@/sanity/queries/catalogoQueries";
import Catalogo from "./Catalogo";
import SelectFilter from "../_components/SelectFilter";
import LightCard from "../_components/LightCard";

export default async function Page() {

  const catalogo = await sanityFetch({
    query: CATALOGO_QUERY,
  });


  const surfaceTypes = await sanityFetch({
    query: ALL_SURFACE_TYPES_QUERY,
  });

  return (
    <section className="w-full min-h-screen bg-primary flex justify-center default-paddings z-10 py-14 lg:py-20 text-light">
      <div className="w-full flex flex-col max-w-screen-xl gap-10">
        <header className="flex flex-col gap-0.5">
          <h2 className="text-2xl md:text-4xl font-semibold mt-1">Catálogo</h2>
          <p className="text-sm sm:text-base font-thin tracking-[3px] uppercase">Encuentra el material que se ajuste a tu proyecto.</p>
        </header>
        <LightCard className="bg-primary-light px-3 md:px-5 lg:px-10 gap-2">
          <div className="flex justify-between items-center">
            <h4 className="text-slate-200">
              Filtra por superficie
            </h4>
            <SelectFilter
              className="bg-primary text-slate-300"
              allTitle="Ver Todos"
              filterName="surfaceType"
              options={surfaceTypes.map(surface => ({
                value: surface._id,
                label: surface.title
              }))}
              allValue="all"
            />
          </div>
        </LightCard>
        <Catalogo catalogo={catalogo} />
      </div>
    </section>
  );
}
