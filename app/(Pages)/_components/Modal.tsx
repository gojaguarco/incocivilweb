"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Modal = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const router = useRouter()

  const handleOpenChange = () => {
    router.push("/", {
      scroll: false
    })
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

  return (
    <section onClick={handleOpenChange} className="fixed z-[100] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm default-paddings flex items-center justify-center px-4">
      <div
        onClick={stopPropagation}
        className="flex items-center justify-center max-w-full">
        <svg onClick={handleOpenChange} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="z-[100] cursor-pointer absolute top-3 right-3 lg:top-20 lg:right-20 w-10 h-10 hover:drop-shadow hover:-translate-y-0.5">
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