import { Outlet } from "react-router-dom";
import { useState } from "react";

import Logo from "./Logo";
import NavBar from "./NavBar";
import Button from "../components/forms/Button";
import Hamburger from "../icons/Hamburger";

const RootLayout = (): JSX.Element => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="my-4 mx-2 text-gray-900">
      <header className="border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <Logo />
          <Button
            text={<Hamburger className="w-6 h-6 mx-2" />}
            type="button"
            handleClick={() => setShowNav(true)}
          />
        </div>
        <NavBar showNav={showNav} setShowNav={setShowNav} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
