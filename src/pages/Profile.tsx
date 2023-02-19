import { useContext, useEffect } from "react";
import { Outlet, useLoaderData, Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import User from "../models/user";
import checkLocalStorage from "../functions/check-local-storage";

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn]);

  const data = useLoaderData();
  const userData: User = (data as User[])[0];

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <p>Username: {userData.userName}</p>
        <p>Email: {userData.userEmail}</p>
      </div>
      <Link to="/profile/edit">Edit</Link>
      <Outlet />
    </div>
  );
};

export default Profile;
