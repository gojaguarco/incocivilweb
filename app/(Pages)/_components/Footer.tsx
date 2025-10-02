import { sanityFetch } from "@/sanity/lib/client";
import { FOOTERSETTINGS_QUERY } from "@/sanity/queries/settingsQueries";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const settings = await sanityFetch({
    query: FOOTERSETTINGS_QUERY,
  });

  function formatPhoneNumber(phoneNumber: number): string {
    // Convertimos el número a string
    const phoneStr = phoneNumber.toString();

    // Formateamos el número con espacios
    const formatted = `${phoneStr.slice(0, 3)} ${phoneStr.slice(
      3,
      6
    )} ${phoneStr.slice(6)}`;

    return formatted;
  }

  const SocialLogo = ({ red }: { red: string }) => {
    if (red === "facebook")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
        </svg>
      );
    if (red === "X")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#fff"
          className="icon icon-tabler icons-tabler-filled icon-tabler-brand-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8.267 3a1 1 0 0 1 .73 .317l.076 .092l4.274 5.828l5.946 -5.944a1 1 0 0 1 1.497 1.32l-.083 .094l-6.163 6.162l6.262 8.54a1 1 0 0 1 -.697 1.585l-.109 .006h-4.267a1 1 0 0 1 -.73 -.317l-.076 -.092l-4.276 -5.829l-5.944 5.945a1 1 0 0 1 -1.497 -1.32l.083 -.094l6.161 -6.163l-6.26 -8.539a1 1 0 0 1 .697 -1.585l.109 -.006h4.267z" />
        </svg>
      );
    if (red === "WhatsApp")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      );
    if (red === "Instagram")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M16.5 7.5v.01" />
        </svg>
      );
    if (red === "linkedIn")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 11v5" />
          <path d="M8 8v.01" />
          <path d="M12 16v-5" />
          <path d="M16 16v-3a2 2 0 1 0 -4 0" />
          <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
        </svg>
      );
    if (red === "YouTube")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#fff"
          className="icon icon-tabler icons-tabler-filled icon-tabler-brand-youtube"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" />
        </svg>
      );
    if (red === "TikTok")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
        </svg>
      );
    if (red === "Otra")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-world"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18" />
          <path d="M12.5 3a17 17 0 0 1 0 18" />
        </svg>
      );
  };

  return (
    <footer className="w-full bg-dark flex flex-col items-center">
      <div className="max-w-screen-xl default-paddings w-full flex flex-col lg:flex-row justify-between py-16 gap-y-12">
        <header className="flex flex-col items-center gap-1">
          <Image
            className="mb-2"
            src="/IsoLogo.svg"
            alt="Incocivil isologo"
            width={140}
            height={150}
          />
          <Image
            className=""
            src="/IncocivilLogo.svg"
            alt="Incocivil logo"
            width={220}
            height={200}
          />
          <Image
            className=""
            src="/InsumosLogo.svg"
            alt="Insumos para la construcción civil isologo"
            width={200}
            height={200}
          />
        </header>
        <section className="flex flex-col md:flex-row gap-x-20 gap-y-12 text-slate-300 px-6">
          <div className="flex flex-col gap-1.5">
            <h4>Enlaces Rápidos</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3" />
            <Link href="/">Home</Link>
            <Link href="/quienes-somos">Quienes Somos</Link>
            <Link href="/projects">Proyectos</Link>
            <Link href="/services">Servicios</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/cotizador">Cotiza tu Proyecto</Link>
            <Link href="/politica">{"Políticas"}</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4>Información</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3" />
            {settings?.information.email && (
              <Link href="/">{settings.information.email}</Link>
            )}
            {settings?.information.phone && (
              <Link href="/">
                +57 {formatPhoneNumber(settings.information.phone)}
              </Link>
            )}
            {settings?.information.address && (
              <span>{settings.information.address}</span>
            )}
            {settings?.information.city && (
              <span>{settings.information.city}</span>
            )}
            {settings?.information.country && (
              <span>{settings.information.country}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <h4>Redes Sociales</h4>
            <div className="w-8 h-[3px] bg-accent1 rounded-full mb-3" />
            <div className="flex">
              {settings?.socialLinks &&
                settings.socialLinks.map((item, index) => {
                  if (!item.redSocial) return null;
                  return (
                    <Link
                      className="w-9 h-9 flex bg-arle-beige text-black justify-center items-center hover:scale-[1.08]"
                      key={index + item.redSocial}
                      href={item.url}
                      target="_blank"
                    >
                      <SocialLogo red={item.redSocial} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
      <footer className="py-4 border-t-[0.3px] border-light w-full flex justify-center text-light-dark z-20">
        <p>Copyright 2024 © Derechos Reservados Diseñado por GoJaguar.co </p>
      </footer>
    </footer>
  );
};

export default Footer;
