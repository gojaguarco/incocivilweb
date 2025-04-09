import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../_lib/cn";

type TProps = ComponentPropsWithoutRef<'a'> & {
  text: string;
  color: 'naranja' | 'amarillo' | 'claro' | 'oscuro';
  size: 'pequeño' | 'mediano' | 'grande';
  link: string;
  scroll?: boolean;
}

const LinkButton = ({ text, color, size = "mediano", link, scroll, className }: TProps) => {

  const sizeClasses = {
    grande: 'py-1.5 px-[17px] xs:px-6 sm:px-8 sm:py-2 text-base sm:text-lg',
    mediano: 'px-4 sm:px-6 py-1.5 xs:py-2 text-sm sm:text-base',
    "pequeño": 'py-1 px-3 sm:px-4 text-xs sm:text-sm',
  };

  // Class variations based on color
  const colorClasses = {
    naranja: 'bg-accent1 text-light',
    amarillo: 'bg-accent2',
    claro: 'bg-transparent text-primary border-2 border-[#5C6171]',
    oscuro: 'bg-primary text-light',
  };

  const buttonClasses = cn(`${colorClasses[color]} ${sizeClasses[size]} flex flex-col items-center justify-center rounded-lg text-nowrap flex-shrink-0 hover:-translate-y-0.5 hover:el-shadow`, className);

  return (
    <Link href={link} className={buttonClasses} scroll={scroll}>
      {text}
    </Link>
  );
}

export default LinkButton