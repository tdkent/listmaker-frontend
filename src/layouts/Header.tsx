import { useState } from "react";

import Logo from "./Logo";
import Hamburger from "../icons/Hamburger";
import NavBar from "./NavBar";
import Button from "../components/forms/Button";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <header className="mx-2 mt-4 mb-4 border-b border-gray-200 relative z-10">
      <div className="flex justify-between items-center mb-4">
        <Logo />
        <Button
          text={<Hamburger />}
          type="button"
          handleClick={() => {
            setShowNav(true);
          }}
        />
      </div>
      <NavBar showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
};

export default Header;
