import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";

const Profile = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // query
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

  //! What to do in this scenario?
  if (!data || !data.userEmail || !data.userName) {
    return <div>User info is incomplete.</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <p>Username: {data.userName}</p>
        <p>Email: {data.userEmail}</p>
      </div>
      <Link to="/profile/edit">Edit</Link>
      <Outlet />
    </div>
  );
};

export default Profile;
