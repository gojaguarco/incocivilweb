"use client"
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../../_components/LinkButton";
import Burger from "../Burger";
import Esquina from "../../_components/Esquina";
import Menu from "../menu";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
}

const MobileNavBar = ({ className }: Props) => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return(
    <nav className={`${className} flex items-center justify-between`}>
      <Link href='/' className="h-full pl-2 xs:pl-4 flex items-center gap-1">
        <Image className="w-[42px] xs:w-[55px]" src='/IsoLogo.svg' alt='isologo Incocivil' height={40} width={55}/>
        <Image className="w-[105px] xs:w-[120px]" src='/IncocivilLogo.svg' alt='isologo Incocivil' height={40} width={120}/>
      </Link>
      <section className="bg-light-dark rounded-bl-[6px] h-full px-2 xs:px-4 flex items-center justify-center gap-2 xs:gap-3 relative">
        <LinkButton text={pathname === "/cotizador" ? "Volver a empezar" : 'Cotizador'} size="grande" color="naranja" link="/cotizador" />
        <Burger isNavOpen={isNavOpen} barColor="bg-primary" openNav={() => setIsNavOpen(true)} closeNav={() => setIsNavOpen(false)}/>
        <Esquina className="absolute h-[6px] w-[6px] top-0 -left-[6px]" colorHex="e0e3ec"/>
        <Esquina className="absolute h-[6px] w-[6px] right-0 -bottom-[6.5px]" colorHex="e0e3ec"/>
      </section>
      <Menu isMenuOpen={isNavOpen} setIsMenu={setIsNavOpen}/>
    </nav>
  )
}

export default MobileNavBar