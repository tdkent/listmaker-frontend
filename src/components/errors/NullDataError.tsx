import CircleExclamation from "../../icons/CircleExclamation";
import Hyperlink from "../forms/Hyperlink";

const NullDataError = () => {
  return (
    <div>
      <div className="flex flex-row items-center mt-6">
        <CircleExclamation styles="h-6 w-6 mr-2" /> <h2>An error occurred</h2>
      </div>

      <div className="mt-4">
        <p className="font-medium">Unknown Error</p>
        <p className="mt-4">
          There was an error attempting to retrieve the data you requested. The resource, or your
          account, may have been lost or deleted.
        </p>
      </div>

      <div className="mt-6">
        <Hyperlink to="/">Go to home page</Hyperlink>
      </div>
    </div>
  );
};

export default NullDataError;
