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
      <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} py-1.5 px-[17px] xs:px-6 sm:px-8 sm:py-2 rounded-lg text-base sm:text-lg text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow`}>{text}</Link>
  )
  if(size === 'mediano')
    return(
    <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} px-4 sm:px-6 py-1.5 xs:py-2 rounded-lg text-sm sm:text-base text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow`}>{text}</Link>
  )
  if(size === 'pequeño')
    return(
    <Link href={link} className={`${color === 'naranja' ? 'bg-accent1 text-light' : color === 'amarillo' ? 'bg-accent2' : color === 'claro' ? 'bg-transparent text-primary border-2 border-[#5C6171]' : color === 'oscuro' && 'bg-primary text-light'} py-1 px-3 sm:px-4 rounded-lg text-xs sm:text-sm text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow`}>{text}</Link>
  )
}

export default LinkButton