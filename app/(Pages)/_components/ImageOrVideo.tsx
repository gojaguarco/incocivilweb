import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot, VideoObject } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { buildFileUrl, parseAssetId } from '@sanity/asset-utils';
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
    <Image className={`${className} rounded-3xl`} src={urlFor(content.imagen).width(800).height(800).format('webp').url()} alt={content.imagen.alt} height={800} width={800}/>
  )
  if(content.video){
    const video = parseAssetId(content.video.video.asset?._ref || "")
    const videoUrl = buildFileUrl(video, {projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET})
    const imagenUrl= urlFor(content.video.imagenDeCarga).width(800).height(800).format('webp').url()
    return(
      <video
        className={`${className} rounded-3xl object-cover bg-dark aspect-video`}
        controls
        playsInline
        autoPlay
        preload="metadata"
        poster={imagenUrl}
      >
        <source src={videoUrl} />
          {content.video.imagenDeCarga && (
          <img src={imagenUrl} alt={content.video.imagenDeCarga.alt} />
          )}
      </video>
    )
  }
}

export default ImageOrVideo