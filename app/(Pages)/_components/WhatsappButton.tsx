import Link from "next/link";

export const WhatsappButton = () => {

  return (
    <Link href="https://wa.me/573172121142?text=Hola,%20quiero%20recibir%20una%20asesoría%20personalizada%20con%20Incocivil!" target="_blank" className="fixed z-20 bottom-8 right-6 md:right-20 overflow-hidden w-[85px] h-[85px] cursor-pointer hover:scale-110 transition-all ease-out">
        <img className="w-full h-full drop-shadow-[1px_1px_2px_rgb(0,0,0,0.4)] absolute" src="/Whatsapp Logo.png" alt="Whatsapp Logo" />
    </Link>
  )
}