import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import QueryError from "../../components/errors/queryError";

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
    return <QueryError error={error} />;
  }

  //! TODO: initiate logout
  if (!data || !data.user) {
    return (
      <div>
        <h2>Could not find your account info</h2>
        <p>Your account may have lost or deleted.</p>
      </div>
    );
  }

  const userData = data.user;

  // TODO: add list data and other account info

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <p>Nickname: {userData.userNickname}</p>
        <p>Email: {userData.userEmail}</p>
      </div>
      <Link to="/profile/edit">Edit</Link>
      <Outlet />
    </div>
  );
};

export default Profile;
