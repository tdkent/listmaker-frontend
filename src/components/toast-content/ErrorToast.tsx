import { AxiosError } from "axios";

import { ValidationError } from "../../models/errors";

interface ErrorToastProps {
  error: AxiosError;
}

const ErrorToast = ({ error }: ErrorToastProps) => {
  // error with response object
  if (error.response) {
    // error with message only
    if ((error.response.data as { message: string }).message) {
      const errorMsg = (error.response.data as { message: string }).message;
      return (
        <div>
          <p>An error occurred:</p>
          <p>{errorMsg}</p>
        </div>
      );

      // express validator error
    } else {
      const validationErrors = (error.response.data as { errors: ValidationError[] }).errors;
      return (
        <div>
          <p>
            Please correct the following {validationErrors.length > 1 ? "errors" : "error"} and try
            again:
          </p>
          <ul>
            {validationErrors.map((error) => (
              <li key={validationErrors.indexOf(error)}>{error.msg}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  // error without response object
  return (
    <div>
      <div>Internal Server Error</div>
      <div>
        <p>The server is temporarily unavailable. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorToast;
