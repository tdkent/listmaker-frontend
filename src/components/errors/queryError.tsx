import { AxiosError } from "axios";

import CircleExclamation from "../../icons/CircleExclamation";
import Hyperlink from "../forms/Hyperlink";

interface QueryErrorProps {
  error: AxiosError;
}

const QueryError = ({ error }: QueryErrorProps) => {
  return (
    <section className="lg:mx-auto lg:w-3/5 lg:mt-8">
      <div className="flex flex-row items-center mt-6">
        <CircleExclamation styles="h-6 w-6 mr-2" /> <h2>An error occurred</h2>
      </div>

      {error.response ? (
        <div className="mt-4">
          <p className="font-medium">Server Error</p>
          <p className="mt-4">
            {error.response.status} {error.response.statusText}
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="font-medium">{error.message}</p>
          <p className="mt-4">
            Our internal server is temporarily unavailable. Please try again later.
          </p>
        </div>
      )}
      <div className="mt-6">
        <Hyperlink to="/">Go to home page</Hyperlink>
      </div>
    </section>
  );
};

export default QueryError;
