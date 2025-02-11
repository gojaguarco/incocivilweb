import { dataset, projectId } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextProps, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";


const PortableTextBlockComponents: Partial<PortableTextReactComponents> = {
  types: {
    imageObject: ({ value }) => {
      return (
        <Image
          src={urlFor(value).width(600).height(350).format('webp').quality(100).url()}
          alt={value.alt}
          width={600}
          height={350}
          className="w-full object-contain max-w-[500px] aspect-video mx-auto"
        />
      )
    },
    video: ({ value }) => {
      const videoAsset = value?.video?.asset;
      const videoUrlMP4 = videoAsset?._ref ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${videoAsset._ref.split('-')[1]}.${videoAsset._ref.split('-')[2]}` : null;
      const posterAsset = value?.imagenDeCarga?.asset;
      const posterUrl = posterAsset?._ref ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${posterAsset._ref.split('-')[1]}-${posterAsset._ref.split('-')[2]}.${posterAsset._ref.split('-')[3]}` : null;

      if (!videoUrlMP4 || !posterUrl) {
        return <p>Video URL not found.</p>;
      } else {
        return (
          <video controls className="w-full object-contain max-w-[500px] aspect-video mx-auto">
            <source src={posterUrl} type="video/webm" />
            <source src={videoUrlMP4} type="video/mp4" />
            <p>
              Your browser does not support the <code>video</code> element.
              <a href={videoUrlMP4}>Download the video</a> instead.
            </p>
          </video>
        )
      }
    }
  }
}
const TextBlock = ({ value }: PortableTextProps) => {
  return (
    <PortableText
      value={value}
      components={PortableTextBlockComponents}
    />
  );
}

export default TextBlock;