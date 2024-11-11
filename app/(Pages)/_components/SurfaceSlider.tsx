"use client"

import { HOMEPAGE_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useLayoutEffect, useRef, useState } from "react"

type TProps = {
  content: Extract<
    NonNullable<HOMEPAGE_QUERYResult>["homePage"][number],
    { _type: "surfaceSliderSection" }
  >['surfaceList']
}

const SurfaceSlider = ({content}: TProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);
  // const [isImageOpen, setImageOpen] = useState(false);
  // const [imageIndex, setImageIndex] = useState(0);

  const selectedImage = Math.round(
    ((scroll - (imageWidth/2) + 2.3 )/ (imageWidth)
    ));

  const handleScroll = () => {
    if (carouselRef.current) {
      setScroll(carouselRef.current.scrollLeft);
    }
  };
  useLayoutEffect(() => {
    const carRef = carouselRef.current;
    handleScroll();
    carRef?.addEventListener("scroll", handleScroll);
    return () => {
      carRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWidth = () => {
    const carRef = carouselRef.current;
    if (window.innerWidth && carRef) {
      setImageWidth(carRef.clientHeight)
    }
  };

  useLayoutEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  return (
    <>
      {/* DESKTOP */}
      <section className="hidden lg:flex w-full pt-5 h-64 gap-2 make-3d items-center justify-center">
        {content.map((surface, index) => (
          <article 
          className={`surface-object h-full flex items-center justify-center`} key={index}>
            <Image className="w-full h-full object-cover rounded-xl" src={urlFor(surface.imageObject).width(600).height(600).format('webp').url()} alt={surface.imageObject.alt} width={600} height={600}/>
          </article>
        ))}
      </section>
      {/* MOBILE */}
      <section ref={carouselRef} className="flex lg:hidden w-full overflow-x-auto no-scrollbar snap-mandatory snap-x">
        <section className="flex">
          <span className="px-[calc(100vw/4)]" />
          {content.map((surface, index) => (
            <article 
            className={`w-[45vw] sm:w-[40vw] md:w-[30vw] aspect-square flex relative`} key={index}>
              <Image 
                onClick={() =>{
                  carouselRef?.current?.scrollTo({ left: index * imageWidth + (imageWidth/2) + 2.3 ,
                  behavior: "smooth"});
                  // if(selectedImage === index){
                  //   setImageIndex(index)
                  //   setImageOpen(true);
                  // }
                }} 
                className={`w-full h-full snap-center object-cover rounded-2xl transition-all ease-out  ${selectedImage === index ? "scale-100 cursor-zoom-in" : "cursor-pointer scale-75"}`} src={urlFor(surface.imageObject).width(600).height(600).format('webp').url()} alt={surface.imageObject.alt} width={600} height={600}/>
            </article>
          ))}
          <span className="px-[calc(100vw/4)]" />
        </section>
      </section>
    </>
  )
}

export default SurfaceSlider