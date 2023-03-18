import { AxiosError } from "axios";

interface ErrorToastProps {
  error: AxiosError;
}

const ErrorToast = ({ error }: ErrorToastProps) => {
  return (
    <div>
      <p>
        <b>An error occurred!</b>
      </p>
      {!error.response ? (
        <p>The server is temporarily unavailable. Please try again later.</p>
      ) : (
        <p>{error.message}</p>
      )}
    </div>
  );
};

export default ErrorToast;
