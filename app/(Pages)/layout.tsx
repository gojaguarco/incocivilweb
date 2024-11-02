import "@/app/globals.css"
import { Inter, Montserrat } from "next/font/google";
import Image from "next/image";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import Navbar from "./ navbar";
import Footer from "./_components/Footer";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  weight: [ "100", "200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function PagesLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <html lang="es, en" className="bg-primary">
      <body className={`${inter.variable} ${montserrat.variable} overflow-x-hidden main-background no-scrollbar relative`}>
        {(await draftMode()).isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4 z-50"
            href="/api/draft-mode/disable"
          >
            Disable preview mode
          </a>
        )}
      <Navbar/>
      <Image src='/Marble.webp' alt='marble backround' width={2000} height={1000} className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 h-full opacity-[25%] object-cover"/>
    <main className="min-h-screen w-full main-background prose lg:prose-lg max-w-none overflow-hidden flex flex-col items-center">
        {children}
    </main>
    <Footer />
    {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}