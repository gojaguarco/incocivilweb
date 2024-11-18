import { useEffect, useRef } from "react";
import { useClickOutside } from "../../_lib/hooks";
import Image from "next/image";
import Link from "next/link";


const Menu = ({
  isMenuOpen,
  setIsMenu,
}: {
  isMenuOpen: boolean;
  setIsMenu: (arg0: boolean) => void;
}) => {


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsMenu(false));

  return (
    <>
      <section className={`${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } fixed z-[100] top-0 left-0 transition-all duration-500 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm`}>
        <nav className={`${
          isMenuOpen ? "right-0" : "-right-[400px]"
        } w-screen fixed top-0 z-[102] max-w-[400px] bottom-0 flex flex-col bg-light-dark transition-all duration-[350ms] ease-out overflow-hidden`}
        ref={menuRef}>
        <header className="w-full h-16 border-b border-gray-300 px-4 flex items-center justify-between">
            <h1 className="ml-3 capitalize text-arle-blue text-base font-semibold font-inter cursor-default">
              Menú
            </h1>
            <svg onClick={() => setIsMenu(false)} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x cursor-pointer">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10l4 4m0 -4l-4 4" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
        </header>
        <section className="w-full h-full flex flex-col gap-4 p-10 [&>a]:text-xl" onClick={() => setIsMenu(false)}>
          <Link href='/'>Home</Link>
          <Link href='/about'>Quienes Somos</Link>
          <Link href='/projects'>Proyectos</Link>
          <Link href='/services'>Servicios</Link>
          <Link href='/blog'>Blog</Link>
        </section>
        <footer className=" w-screen max-w-[400px] h-16 border-t border-stone-300 flex items-center justify-center gap-2">
          <Image src="/IsoLogo.svg" alt="Incocivil isoLogo" height={50} width={50} />
          <Image src="/IncocivilLogoBlack.svg" alt="Incocivil Logo" height={50} width={135} />
        </footer>
        </nav>
      </section>
    </>
  )
}

export default Menu