import { useRouteError, Link } from "react-router-dom";
interface Error {
  data: {
    message: string;
    helpEmail: string;
  };
  status: 404;
}

const CareersDetailsError = () => {
  const error = useRouteError();
  const newError: Error = error as Error;
  return (
    <div>
      <h2>Error</h2>
      <p>Status Code: {newError.status}</p>
      <p>{newError.data.message}</p>
      <p>Need Help? Let us know at {newError.data.helpEmail}</p>
      <Link to="/">Back to the homepage</Link>
    </div>
  );
};

export default CareersDetailsError;
