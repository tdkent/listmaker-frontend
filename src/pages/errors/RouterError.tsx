import { useRouteError } from "react-router-dom";

import { RootErrorInt } from "../../models/errors";
import CircleExclamation from "../../icons/CircleExclamation";
import Hyperlink from "../../components/forms/Hyperlink";

const RouterError = () => {
  const error: RootErrorInt = useRouteError() as RootErrorInt;
  return (
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
  );
};

export default RouterError;
