import Image from "next/image"
import Link from "next/link"


const Footer = () => {
  return (
    <footer className="w-full bg-dark flex flex-col items-center">
      <div className="max-w-screen-xl default-paddings w-full flex flex-col lg:flex-row justify-between z-20 py-16 gap-y-12">
        <header className="flex flex-col items-center gap-1">
          <Image className="mb-2" src="/IsoLogo.svg" alt="Incocivil isologo" width={140} height={150}/>
          <Image className="" src="/IncocivilLogo.svg" alt="Incocivil logo" width={220} height={200}/>
          <Image className="" src="/InsumosLogo.svg" alt="Insumos para la construcción civil isologo" width={200} height={200}/>
        </header>
        <section className="flex flex-col md:flex-row gap-x-20 gap-y-12 text-slate-300 px-6">
          <div className="flex flex-col gap-1.5">
            <h4>Enlaces Rápidos</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3"/>
            <Link href="/">Home</Link>
            <Link href="/quienes-somos">Quienes Somos</Link>
            <Link href="/">Proyectos</Link>
            <Link href="/">Servicios</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Cotiza tu Proyecto</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4>Información</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3"/>
            <Link href="/">gerenciaincocivil@gmail.com</Link>
            <Link href="/">+57 317 212 1142</Link>
            <Link href="/">Cali - Valle del Cauca</Link>
            <Link href="/">Colombia</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4>Redes Sociales</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3"/>
            <div className="flex">
              <Link href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
              </Link>
            </div>
          </div>

        </section>
      </div>
      <footer className="py-4 border-t-[0.3px] border-light w-full flex justify-center text-light-dark z-20">
        <p>Copyright 2024 © Derechos Reservados Diseñado por GoJaguar.co </p>
      </footer>
    </footer>
  )
}

export default Footer