import Image from "next/image";
import Link from "next/link";
import LinkButton from "../../_components/LinkButton";
import Burger from "../Burger";

type Props = {
  className?: string;
}

const MobileNavBar = ({ className }: Props) => {
  return(
    <nav className={`${className} flex items-center justify-between`}>
      <Link href='/' className="h-full pl-4 flex items-center gap-1">
        <Image src='/IsoLogo.svg' alt='isologo Incocivil' height={40} width={55}/>
        <Image src='/IncocivilLogo.svg' alt='isologo Incocivil' height={40} width={120}/>
      </Link>
      <section className="bg-light-dark rounded-bl-lg h-full pl-4 pr-4 flex items-center justify-center gap-3">
        <LinkButton text='Contáctanos' size="grande" color="naranja" link="/" />
        <Burger isNavOpen={false} barColor="bg-primary"/>
      </section>
    </nav>
  )
}

export default MobileNavBar