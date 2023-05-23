import { Outlet } from "react-router-dom";
import { useState } from "react";

import Logo from "./Logo";
import NavBar from "./NavBar";
import Button from "../components/forms/Button";
import Hamburger from "../icons/Hamburger";

const RootLayout = (): JSX.Element => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div>
      <header className="mx-2 mt-4 mb-8 border-b border-gray-200 relative z-10">
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
      <main className="mx-3 relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
