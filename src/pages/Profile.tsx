import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import { UserInfoInt } from "../models/user";
import checkLocalStorage from "../utils/check-local-storage";
import { fetchUserProfile } from "../api/user";

const useProfile = (userId: number, token: string) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserProfile(userId, token),
  });
  return { isError, isLoading, data, error: error as AxiosError };
};

const Profile = () => {
  // auth check
  const auth = useContext(AuthContext);
  console.log("auth: ", auth);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // query
  const { data } = useProfile(auth.userId as number, auth.token as string);
  console.log("response: ", data);

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <p>Username: {data?.userName}</p>
        <p>Email: {data?.userEmail}</p>
      </div>
      <Link to="/profile/edit">Edit</Link>
      <Outlet />
    </div>
  );
};

export default Profile;
