import { useRouter } from "next/navigation";
import LinkButton from "../_components/LinkButton";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import LightCard from "../_components/LightCard";
import { cn } from "../_lib/cn";
import { colombianPriceStringToNumber, numberToColombianPriceString } from "@/app/helpers";
import CaptureForm from "./CaptureForm";

const CaptureInfo = ({
  createQueryString,
  captureInfoOpen,
}: {
  createQueryString: (name: string, value: string, action: 'add' | 'remove' | 'replace') => string;
  captureInfoOpen: boolean;
}) => {
  const [totalToShow, setTotalToShow] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const surfaceTotals = document.getElementsByClassName("surface-total");
    const observer = new MutationObserver(calculateTotal); // Create the observer

    // Observe changes to the child list (nodes within the element) and character data (text content)
    Array.from(surfaceTotals).forEach(surfaceTotal => {
      observer.observe(surfaceTotal, { childList: true, characterData: true, subtree: true });
    });

    function calculateTotal() {
      let total = 0;
      Array.from(surfaceTotals).forEach(surfaceTotal => {
        const textContent = surfaceTotal.textContent ? surfaceTotal.textContent.trim() : ''; // Trim whitespace!
        const price = colombianPriceStringToNumber(textContent);
        total += price;
      });
      setTotalToShow(total);
    }

    calculateTotal(); // Calculate initial total in case content is already there

    return () => {
      observer.disconnect(); // Clean up the observer on unmount
    };
  }, []);
  return (
    <>
      <LinkButton
        // scroll={false}
        text="Cotizar"
        color="naranja"
        size="mediano"
        link={`?${createQueryString("capture-info", "true", "add")}`}
      />
      {captureInfoOpen && (
        <section
          onClick={() => {
            router.push(`?${createQueryString("capture-info", "true", "remove")}`, { scroll: false })
          }}
          className="absolute top-0 z-[200] left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >

          <LightCard
            onClick={e => e.stopPropagation()}
            className="bg-light-dark p-10 relative z-[200] rounded-md px-10 flex flex-col w-[85dvw] mx-auto gap-5"
          >
            <CaptureForm totalToShow={totalToShow} />
          </LightCard>
        </section>
      )}
    </>
  );
}

export default CaptureInfo;


