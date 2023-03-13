import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import checkLocalStorage from "../utils/check-local-storage";
import useUser from "../hooks/useUser";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import { UserProfileEnum } from "../models/user";
import { AuthReducerActionInt } from "../models/auth";
import EditUserName from "../components/EditUserName";

const ProfileEdit = () => {
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
  console.log("data: ", data);

  // reducer

  // const defaultState = {
  //   userEmail: "",
  //   userName: "",
  // };

  // const reducer = (state: typeof defaultState, action: AuthReducerActionInt) => {
  //   if (action.type === UserProfileEnum.email) {
  //     return { ...state, userEmail: action.payload };
  //   }
  //   if (action.type === UserProfileEnum.username) {
  //     return { ...state, userName: action.payload };
  //   }
  //   throw new Error(`No matching "${action.type}" action type`);
  // };

  // const [state, dispatch] = useReducer(reducer, defaultState);

  // form submission
  // const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value);
  // };

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

  if (!data) {
    return <div>No data</div>;
  }

  console.log(data.userEmail);

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <div>
        <EditUserName data={data} />
      </div>
    </div>
  );
};

export default ProfileEdit;
