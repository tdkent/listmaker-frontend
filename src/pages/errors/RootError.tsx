import { useState } from "react";
import { useRouteError } from "react-router-dom";

import { RootErrorInt } from "../../models/errors";
import CircleExclamation from "../../icons/CircleExclamation";
import Hyperlink from "../../components/forms/Hyperlink";
import Logo from "../../layouts/Logo";
import Button from "../../components/forms/Button";
import Hamburger from "../../icons/Hamburger";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";

const RootError = () => {
  const [showNav, setShowNav] = useState(false);
  const error: RootErrorInt = useRouteError() as RootErrorInt;
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
          <div>
            <div className="flex flex-row items-center mt-6">
              <CircleExclamation styles="h-6 w-6 mr-2" /> <h2>An error occurred</h2>
            </div>
            <div className="mt-4">
              <p>Status: {error.status ? `${error.status} - ${error.statusText}` : "Unknown"}</p>
              {error.message && <p className="mt-2">Message: {error.message}</p>}
            </div>
            <div className="mt-6">
              <Hyperlink to="/">Go to home page</Hyperlink>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RootError;
