import { AxiosError } from "axios";

interface QueryErrorProps {
  error: AxiosError;
}

const QueryError = ({ error }: QueryErrorProps) => {
  return (
    <div>
      <h2>There was an error!</h2>
      {error.response ? (
        <div>
          <p>
            {error.response.status} {error.response.statusText}
          </p>
        </div>
      ) : (
        <div>
          <p>{error.message}</p>
          <p>Our internal server is temporarily unavailable. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default QueryError;
