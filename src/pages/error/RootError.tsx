import { useRouteError, Link } from "react-router-dom";

interface Error {
  status: number;
  statusText: string;
  error: {
    message: string;
  };
}

const RootError = () => {
  const error = useRouteError();
  const newError: Error = error as Error;
  console.log("newError: ", newError, newError.error);
  return (
    <div>
      <h2>Error!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>More info about the error:</p>
      <p>
        Status: {newError.status} - {newError.statusText}
      </p>
      {/* <p>Message: {newError.error.message}</p> */}
      <Link to="/">Return to the homepage</Link>
    </div>
  );
};

export default RootError;
