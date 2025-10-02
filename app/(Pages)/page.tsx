import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/queries/homeQueries";
import HomeHeroSection from "./_components/Home/HomeHeroSection";
import ServicesSection from "./_components/Home/ServicesSection";
import WhyUsSection from "./_components/Home/WhyUsSection";
import SurfaceSliderSection from "./_components/Home/SurfaceSliderSection";
import FaqSection from "./_components/Home/FaqSection";
import ContactSection from "./_components/Home/ContactSection";

export default async function Page() {
  const homeContent = await sanityFetch({
    query: HOMEPAGE_QUERY,
  });

  return (
    <>
      {homeContent?.homePage.map((section, index) => (
        <section
          key={index}
          className="relative w-full flex flex-col items-center"
        >
          {section._type == "homeHeroSection" && (
            <HomeHeroSection content={section} />
          )}
          {section._type == "servicesSection" && (
            <ServicesSection content={section} />
          )}
          {section._type == "whyusSection" && (
            <WhyUsSection content={section} />
          )}
          {section._type == "surfaceSliderSection" && (
            <SurfaceSliderSection content={section} />
          )}
          {section._type == "faqSection" && <FaqSection content={section} />}
          {section._type == "contactSection" && (
            <ContactSection content={section} />
          )}
        </section>
      ))}
    </>
  );
}
