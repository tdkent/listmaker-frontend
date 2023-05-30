import { useState } from "react";

import Logo from "./Logo";
import Hamburger from "../icons/Hamburger";
import NavBar from "./NavBar";
import Button from "../components/forms/Button";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <header className="mx-2 mt-4 mb-4 lg:pb-2 border-b border-gray-200 relative max-lg:z-10 lg:flex lg:flex-row lg:items-center lg:justify-between lg:mx-0 lg:pl-4 lg:pr-8">
      <div className="max-lg:flex max-lg:justify-between max-lg:items-center max-lg:mb-4">
        <Logo />
        <Button
          text={<Hamburger />}
          type="button"
          handleClick={() => {
            setShowNav(true);
          }}
          divStyles="lg:hidden"
        />
      </div>
      <NavBar showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
};

export default Header;
