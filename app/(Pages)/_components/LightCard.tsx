import { ComponentPropsWithoutRef } from "react";
import { cn } from "../_lib/cn";

type Props = ComponentPropsWithoutRef<'section'>;
const LightCard = ({ children, className, ...rest }: Props) => {
  return (
    <section className={cn("md:bg-light-dark text-dark rounded-xl md:px-10 md:py-4 flex flex-col gap2", className)} {...rest}>  
      {children}
    </section>

  );
}

export default LightCard;