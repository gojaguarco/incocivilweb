import { ComponentPropsWithoutRef } from "react";
import { cn } from "../_lib/cn";

type Props = ComponentPropsWithoutRef<'section'>;
const LightCard = ({ children, className }: Props) => {
  return (
    <section className={cn("bg-light-dark text-dark rounded-xl px-10 py-6", className)}>
      {children}
    </section>

  );
}

export default LightCard;