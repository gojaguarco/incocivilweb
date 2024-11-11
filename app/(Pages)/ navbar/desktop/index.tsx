"use client"
import Image from "next/image";
import LinkButton from "../../_components/LinkButton";
import Link from "next/link";
import Esquina from "../../_components/Esquina";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
}

const DesktopNavBar = ({ className }: Props) => {

  const pathname = usePathname();
  
  return(
    <nav className={`${className} items-center justify-between`}>
      <Link href='/' className="h-full w-full pl-10 xl:pl-20 2xl:pl-60 flex items-center gap-3">
        <Image src='/IsoLogo.svg' alt='isologo Incocivil' height={40} width={70}/>
        <Image src='/IncocivilLogo.svg' alt='isologo Incocivil' height={40} width={180}/>
      </Link>
      <div className="w-full h-full flex items-center justify-end prose gap-6 xl:gap-9 pr-10 nav-font">
        <Link className={`${pathname === '/' && 'underline underline-offset-2 pointer-events-none'}`} href='/'>Home</Link>
        <Link className={`${pathname === '/quienes-somos' && 'underline underline-offset-2 pointer-events-none'}`} href='/quienes-somos'>Quienes Somos</Link>
        <Link href='/'>Proyectos</Link>
        <Link href='/'>Servicios</Link>
        <Link href='/'>Blog</Link>
        
      </div>
      <section className="relative bg-light-dark rounded-bl-xl h-full pl-4 pr-10 xl:pr-20 2xl:pr-60 flex items-center justify-center">
        <Esquina className="absolute h-3 w-3 top-0 -left-3" colorHex="e0e3ec"/>
        <Esquina className="absolute h-3 w-3 right-0 -bottom-[12.5px]" colorHex="e0e3ec"/>
        <LinkButton text='Contáctanos' size="grande" color="naranja" link="/" />
      </section>
    </nav>
  )
}

export default DesktopNavBar;