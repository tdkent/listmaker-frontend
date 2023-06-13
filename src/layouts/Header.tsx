import { useState } from "react";

import Logo from "./Logo";
import Hamburger from "../icons/Hamburger";
import NavBar from "./NavBar";
import Button from "../components/forms/Button";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <header
      id="header"
      className="mb-4 px-2 pt-4 lg:pb-4 border-b border-gray-200 dark:border-gray-600 relative max-lg:z-10 lg:flex lg:flex-row lg:items-center lg:justify-between lg:mx-0 lg:pl-4 lg:pr-8 dark:bg-gray-900">
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
