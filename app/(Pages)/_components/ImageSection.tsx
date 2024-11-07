import { Button, internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot, VideoObject } from "@/sanity.types";
import LinkButton from "./LinkButton";
import ImageOrVideo from "./ImageOrVideo";


type TProps = {
  content:{
    title: string;
    sectionName?: string;
    descriptionText: string;
    ctaButton1: Button;
    ctaButton2?: Button;
    ImageOrVideo: {
        imagenOVideo?: boolean;
        imagen?: {
            asset?: {
                _ref: string;
                _type: "reference";
                _weak?: boolean;
                [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
            };
            hotspot?: SanityImageHotspot;
            crop?: SanityImageCrop;
            alt: string;
            _type: "imageObject";
        };
        video?: VideoObject;
    };
    _type: "imageSection";
    _key: string;
  };
  inverse?: boolean;
  bg: string;
}

const ImageSection = ({content, inverse, bg}: TProps) => {
  return (
    <section className={`flex justify-center relative w-full py-14 lg:py-20 overflow-hidden default-paddings ${bg}`}>
      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-14 lg:items-center max-w-screen-xl">
      <section className="w-full lg:w-1/2 flex flex-col gap-5">
          <h2 className="text-slate-800 text-xl sm:text-2xl">{content.title}</h2>
          <p>{content.descriptionText}</p>
          <div className="flex gap-3">
            <LinkButton color={content.ctaButton1.color} link={content.ctaButton1.link} size={content.ctaButton1.size} text={content.ctaButton1.text}/>
            {content.ctaButton2 && (
            <LinkButton color={content.ctaButton2.color} link={content.ctaButton2.link} size={content.ctaButton2.size} text={content.ctaButton2.text}/>
            )}
          </div>
        </section>
        <ImageOrVideo className="w-full lg:w-1/2" content={content.ImageOrVideo} />
      </div>
    </section>
  )
}

export default ImageSection