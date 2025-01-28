import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type TProps = ComponentPropsWithoutRef<'nav'> & {
  nextLink: string,
  backLink: string,
}

const NavButtons = ({ nextLink, backLink, ...rest }: TProps) => {

  return (
    <nav {...rest}>
      {backLink && (
        <Link scroll={false} className="absolute top-1/2 -translate-y-1/2 left-4 bg-light p-2 rounded-full hover:bg-light-dark text-black" href={backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="-translate-x-0.5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
        </Link>
      )}
      {nextLink && (
        <Link scroll={false} className="absolute top-1/2 -translate-y-1/2 right-4 bg-light p-2 rounded-full hover:bg-light-dark" href={nextLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </Link>
      )}
    </nav>
  )
}

export default NavButtons