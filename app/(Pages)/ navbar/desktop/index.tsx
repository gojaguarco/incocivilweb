"use client"
import Image from "next/image";
import LinkButton from "../../_components/LinkButton";
import Link from "next/link";
import Esquina from "../../_components/Esquina";
import { usePathname } from "next/navigation";
import { navOptions } from "../menu/navOptions";

type Props = {
  className?: string;
}

const DesktopNavBar = ({ className }: Props) => {

  const pathname = usePathname();

  return (
    <nav className={`${className} items-center justify-between`}>
      <Link href='/' className="h-full w-full pl-10 xl:pl-20 2xl:pl-60 flex items-center gap-3">
        <Image src='/IsoLogo.svg' alt='isologo Incocivil' height={40} width={70} />
        <Image src='/IncocivilLogo.svg' alt='isologo Incocivil' height={40} width={180} />
      </Link>
      <div className="w-full h-full flex items-center justify-end prose gap-6 xl:gap-9 pr-10 nav-font">
        {navOptions.map((option) => (
          <Link key={option.title} className={`${pathname === option.url ? 'underline underline-offset-2 !font-medium pointer-events-none !text-white' :'!text-light-dark'}`} href={option.url}>{option.title}</Link>
        ))}
      </div>
      <section className="relative bg-light-dark rounded-bl-xl h-full pl-4 pr-10 xl:pr-20 2xl:pr-60 flex items-center justify-center">
        <Esquina className="absolute h-3 w-3 top-0 -left-3" colorHex="e0e3ec" />
        <Esquina className="absolute h-3 w-3 right-0 -bottom-[12.5px]" colorHex="e0e3ec" />
        <LinkButton text={'Cotizador'} className={pathname.includes("/cotizador") ? "hidden" : ""} size="grande" color="naranja" link="/cotizador" />
        {/* <LinkButton text={"Contáctanos"} size="grande" color="naranja" link="/contact" /> */}
      </section>
    </nav>
  )
}

export default DesktopNavBar;