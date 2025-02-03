import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Esquina from "./Esquina";
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from "@/sanity.types";

const ItemCard = ({ title, image, imageAlt, description }: {
  image: {
    asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image" | "imageObject";
} | null;
  imageAlt: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-2 bg-primary-light rounded-2xl flex items-center justify-center h-48 lg:h-56 el-shadow group relative text-light">
      {image ? <Image className="rounded-xl w-full h-full object-cover" src={urlFor(image).width(500).height(500).format('webp').url()} alt={imageAlt} width={500} height={500} /> : (
        <div className="w-full h-full bg-primary rounded-xl flex items-center justify-center">
          <h2 className="text-4xl">📸</h2>
        </div>
      )}
      <footer className="absolute bottom-2 left-2 right-2 flex flex-col items-start">
        <div className={`bg-primary-light rounded-tr-xl flex px-2 py-1 items-center gap-1.5 max-w-[80%] relative`}>
          <h6 className={`text-light group-hover:underline underline-offset-2 capitalize`}>{title}</h6>
          <div className="w-4 h-4 rounded-full bg-accent1 group-hover:rotate-90 transition-all flex items-center justify-center">
            <svg className="w-3.5 h-3.5 -rotate-45" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M18 11l-6 -6" />
              <path d="M6 11l6 -6" />
            </svg>
          </div>
          <Esquina className="absolute rotate-180 w-2.5 h-2.5 -top-2 left-0" colorHex={`414553`} />
          <Esquina className="absolute rotate-180 w-2.5 h-2.5 -right-2.5 -bottom-1" colorHex={`414553`} />
        </div>
        <p className="bg-primary-light w-full px-2 pt-1 relative">
          {description}
          <Esquina className="absolute rotate-180 w-2.5 h-2.5 -top-2.5 left-0" colorHex={`414553`} />
        </p>
      </footer>
    </div>
  );
}

export default ItemCard;