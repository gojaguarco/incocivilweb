import { sanityFetch } from "@/sanity/lib/client";
import { ABOUTPAGE_QUERY } from "@/sanity/queries/aboutQueries";
import AboutHeroSection from "../_components/About/AboutHeroSection";

const aboutContent = await sanityFetch({
  query: ABOUTPAGE_QUERY,
})

const Page = () => {

  return (
    <>
      {aboutContent?.aboutPage.map((section, index) => (
        <section key={index} className="relative w-full flex flex-col items-center">
          {section._type == 'aboutHeroSection' && (
            <AboutHeroSection content={section}/>
          )}
        </section>
      ))}
    </>
  );
}

export default Page;