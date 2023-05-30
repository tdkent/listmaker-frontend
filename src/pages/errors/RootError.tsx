import { useRouteError } from "react-router-dom";

import { RootErrorInt } from "../../models/errors";
import CircleExclamation from "../../icons/CircleExclamation";
import Hyperlink from "../../components/forms/Hyperlink";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

const RootError = () => {
  const error: RootErrorInt = useRouteError() as RootErrorInt;
  return (
    <>
      <div id="container" className={`min-h-[calc(100vh-192px)]`}>
        <Header />
        <main className="mx-3 relative z-0 lg:w-[1024px] lg:mx-auto lg:px-6">
          <section className="lg:mx-auto lg:w-3/5 lg:mt-8">
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
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RootError;
