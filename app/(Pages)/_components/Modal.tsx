"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Modal = ({
  children,
 }:{
  children: React.ReactNode
}) => {

  const router = useRouter()

  const handleOpenChange = () => {
    router.back()
  }

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return(
    <section onClick={handleOpenChange} className="fixed z-[100] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center default-paddings">
      <div onClick={stopPropagation} className="w-full max-w-screen-xl">
      <svg onClick={handleOpenChange} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" cursor-pointer absolute top-5 right-5 lg:top-20 lg:right-20 w-10 h-10 hover:drop-shadow hover:-translate-y-0.5">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10l4 4m0 -4l-4 4" />
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
      </svg>
      {children}
      </div>
    </section>
  )
}

export default Modal