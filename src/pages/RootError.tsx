import { useRouteError, useNavigate, Link } from "react-router-dom";

import { RootErrorInt } from "../models/errors";

const RootError = () => {
  const errorData = useRouteError();
  const error: RootErrorInt = errorData as RootErrorInt;
  console.log("error: ", error);
  const navigate = useNavigate();
  return (
    <div>
      <h2>Oops!</h2>
      <h3>
        An {!error.statusText && "unknown"} error occurred. We're so sorry about
        that!
      </h3>
      <div>
        <p>As a token of our regard, please accept this picture of a cat:</p>
        <p>His name is Justinian.</p>
      </div>
      <div>
        <button onClick={() => navigate(-1)}>Return to previous page</button>
      </div>
      <div>
        <h4>Error Info</h4>
        <p>Code: {error.status}</p>
        <p>
          Message: {error.statusText ? error.statusText : error.data.message}
        </p>
      </div>
    </div>
  );
};

export default RootError;
