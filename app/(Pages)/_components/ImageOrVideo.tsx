import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot, VideoObject } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react'

type TProps = {
 content: {
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
 },
 className ?: string,
}

const ImageOrVideo = ({content, className}: TProps) => {
  if(content.imagenOVideo === true && content.imagen)
  return (
    <Image className={`${className} rounded-3xl`} src={urlFor(content.imagen.asset || "").width(800).height(800).url()} alt={content.imagen.alt} height={800} width={800}/>
  )
  if(content.video)
  return(
    <video src={urlFor(content.video.video.asset || "").height(800).width(800).url()}/>
  )
}

export default ImageOrVideo