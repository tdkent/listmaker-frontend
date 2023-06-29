import { useContext } from "react";
import { Outlet } from "react-router-dom";

import ErrorContext from "../context/ErrorContext";
import ModalContext from "../context/ModalContext";
import AuthContext from "../context/AuthContext";
import ShowApiError from "../components/errors/ShowApiError";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = (): JSX.Element => {
  const auth = useContext(AuthContext);
  // errors
  const { active, data } = useContext(ErrorContext);
  const modal = useContext(ModalContext);
  return (
    <div id="wrapper">
      <div
        id="container"
        className={`${
          auth.isLoggedIn
            ? "max-lg:min-h-[calc(100vh-(240px+2rem))]"
            : "max-lg:min-h-[calc(100vh-(210px+2rem))]"
        } min-h-[calc(100vh-(120px+2rem))]`}>
        <Header />
        <main className="mx-3 relative z-0 lg:w-[1024px] lg:mx-auto lg:px-6">
          {active && !modal.active && <ShowApiError errorData={data!} />}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
