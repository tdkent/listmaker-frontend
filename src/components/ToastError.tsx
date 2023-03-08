import { AxiosError } from "axios";

interface ToastErrorProps {
  error: AxiosError;
}

const ToastError = ({ error }: ToastErrorProps) => {
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

export default ToastError;
