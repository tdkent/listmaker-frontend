import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import EditUserName from "../../components/user/EditUserName";

const EditProfile = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // query
  //! is RQ refetching data that should be cached?
  const { isLoading, isError, data, error } = useUser(auth.userId as number, auth.token as string);

  if (isLoading) {
    // TODO: Loading graphic / spinner
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO: standardize on-page error info
    //! Note that server errors are being routed to RootError
    return (
      <div>
        <h2>There was an error!</h2>
        {error.response && (
          <p>
            {error.response.status} {error.response.statusText}
          </p>
        )}
        <p>{error.message}</p>
      </div>
    );
  }

  //? how to handle this scenario?
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <div>
        <EditUserName data={data} />
      </div>
      {/* // TODO: Add a cancel button */}
    </div>
  );
};

export default EditProfile;
