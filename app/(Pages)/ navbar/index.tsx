import DesktopNavBar from "./desktop";
import MobileNavBar from "./mobile";

const Navbar = () => {

  return (
    <>
      <MobileNavBar className="sticky main-background top-0 w-full lg:hidden h-[60px] border-b-light-dark border-b-[0.5px] z-50" />
      <DesktopNavBar className="hidden w-full lg:flex sticky top-0 h-[60px] main-background border-b-light-dark border-b-[0.5px] z-50" />
    </>
  );
};

export default Navbar;