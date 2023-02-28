import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ErrorDisplayInt } from "../models/errors";

const ErrorDisplay = ({ error }: { error: ErrorDisplayInt }) => {
  return (
    <div>
      <h4>Oops! An error occurred.</h4>
      <p>{error.statusText}</p>
      <p>Status Code: {error.status}</p>
    </div>
  );
};

export default ErrorDisplay;
