import { Outlet, useLoaderData, Link } from "react-router-dom";

import User from "../models/user";

const Profile = () => {
  const data = useLoaderData();
  const userData: User = (data as User[])[0];
  console.log("userData: ", userData);
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
