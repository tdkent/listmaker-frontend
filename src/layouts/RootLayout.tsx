import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";

import ErrorContext from "../context/ErrorContext";
import ModalContext from "../context/ModalContext";
import ShowApiError from "../components/errors/ShowApiError";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Button from "../components/forms/Button";
import Hamburger from "../icons/Hamburger";

const RootLayout = (): JSX.Element => {
  // errors
  const { active, data } = useContext(ErrorContext);
  const modal = useContext(ModalContext);
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div id="container" className={`min-h-[calc(100vh-192px)]`}>
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
        <main className="mx-3 relative z-0">
          {active && !modal.active && <ShowApiError errorData={data!} />}
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
