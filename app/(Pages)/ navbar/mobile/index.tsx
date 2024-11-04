import Image from "next/image";
import Link from "next/link";
import LinkButton from "../../_components/LinkButton";
import Burger from "../Burger";
import Esquina from "../../_components/Esquina";

type Props = {
  className?: string;
}

const MobileNavBar = ({ className }: Props) => {
  return(
    <nav className={`${className} flex items-center justify-between`}>
      <Link href='/' className="h-full pl-2 xs:pl-4 flex items-center gap-1">
        <Image className="w-[42px] xs:w-[55px]" src='/IsoLogo.svg' alt='isologo Incocivil' height={40} width={55}/>
        <Image className="w-[110px] xs:w-[120px]" src='/IncocivilLogo.svg' alt='isologo Incocivil' height={40} width={120}/>
      </Link>
      <section className="bg-light-dark rounded-bl-[6px] h-full px-2 xs:px-4 flex items-center justify-center gap-1.5 xs:gap-3 relative">
        <LinkButton text='Contáctanos' size="grande" color="naranja" link="/" />
        <Burger isNavOpen={false} barColor="bg-primary"/>
        <Esquina className="absolute h-[6px] w-[6px] top-0 -left-[6px]" colorHex="e0e3ec"/>
        <Esquina className="absolute h-[6px] w-[6px] right-0 -bottom-[6.5px]" colorHex="e0e3ec"/>
      </section>
    </nav>
  )
}

export default MobileNavBar