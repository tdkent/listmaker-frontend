import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AxiosErrorInfoInt } from "../models/errors";

// TODO: toast css

const ErrorDisplay = ({ error }: { error: AxiosErrorInfoInt }) => {
  return (
    <div>
      <h4>Oops! An error occurred.</h4>
      <p>{error.statusText}</p>
      <p>Status Code: {error.status}</p>
    </div>
  );
};

export default ErrorDisplay;
