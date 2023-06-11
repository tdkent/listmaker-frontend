import { useContext } from "react";
import { Outlet } from "react-router-dom";

import ErrorContext from "../context/ErrorContext";
import ModalContext from "../context/ModalContext";
import ShowApiError from "../components/errors/ShowApiError";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = (): JSX.Element => {
  // errors
  const { active, data } = useContext(ErrorContext);
  const modal = useContext(ModalContext);
  return (
    <>
      <div id="container" className={`min-h-[calc(100vh-192px)] dark:bg-black`}>
        <Header />
        <main className="mx-3 relative z-0 lg:w-[1024px] lg:mx-auto lg:px-6">
          {active && !modal.active && <ShowApiError errorData={data!} />}
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
