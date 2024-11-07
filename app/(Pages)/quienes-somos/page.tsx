import { sanityFetch } from "@/sanity/lib/client";
import AboutHeroSection from "../_components/About/AboutHeroSection";
import { ABOUTPAGE_QUERY } from "@/sanity/queries/aboutQueries";
import WhatWeDoSection from "../_components/About/WhatWeDoSection";
import ImageSection from "../_components/ImageSection";


const Page = async () => {

  const aboutContent = await sanityFetch({
    query: ABOUTPAGE_QUERY,
  })

  return (
    <>
      {aboutContent?.aboutPage.map((section, index) => (
        <section key={index} className="relative w-full flex flex-col items-center">
          {section._type == 'aboutHeroSection' && (
            <AboutHeroSection content={section}/>
          )}
          {section._type == 'whatwedoSection' && (
            <WhatWeDoSection content={section} />
          )}
          {section._type == 'imageSection' && (
            <ImageSection bg="bg-light-dark" content={section} />
          )}
        </section>
      ))}
    </>
  );
}

export default Page;