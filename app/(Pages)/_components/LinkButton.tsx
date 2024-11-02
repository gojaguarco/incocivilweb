import Link from "next/link";

type TProps = {
  text: string;
  color: 'naranja' | 'amarillo' | 'claro' | 'oscuro';
  size: 'pequeño' | 'mediano' | 'grande';
  link: string;
}

const LinkButton = ({text, color, size, link}: TProps) => {
  if(size === 'grande')
    return (
      <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} px-8 py-2 rounded-xl text-sm md:text-lg text-nowrap flex-shrink-0`}>{text}</Link>
  )
  if(size === 'mediano')
    return(
    <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} px-8 py-2 rounded-xl text-sm md:text-lg text-nowrap flex-shrink-0`}>{text}</Link>
  )
  if(size === 'pequeño')
    return(
    <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} px-8 py-2 rounded-xl text-sm md:text-lg text-nowrap flex-shrink-0`}>{text}</Link>
  )
}

export default LinkButton