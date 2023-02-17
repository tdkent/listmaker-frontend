import { useRouteError } from "react-router-dom";

import { RootErrorInt } from "../models/errors";

const RootError = () => {
  const error: RootErrorInt = useRouteError() as RootErrorInt;
  console.error(error);
  return (
    <div>
      <h2>There was an error.</h2>
      <p>
        Status:{" "}
        {error.status
          ? `${error.status} - ${error.statusText}`
          : "400 - Bad Request"}
      </p>
      {error.message && <p>Message: {error.message}</p>}
    </div>
  );
};

export default RootError;
