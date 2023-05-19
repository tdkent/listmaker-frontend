import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import QueryError from "../../components/errors/queryError";
import { CustomStylesEnum } from "../../models/styles";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

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
      <h2>My Profile</h2>
      <div className="border-t my-4 py-4">
        <p className="mb-2.5">Email: {userData.userEmail}</p>
        <p className="mb-2.5">Nickname: {userData.userNickname}</p>
        <div
          className={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} text-center`}>
          <Link to="/profile/edit">Edit</Link>
        </div>
      </div>
      <div className="border-t my-4 py-4">
        <h4>Change Password</h4>
        <div className="my-4">
          <Form id="change-password-form">
            {/* // TODO: change type to password */}
            <Input type="text" id="" name="" label="New Password" handleChange={() => {}} />
            <Input type="text" id="" name="" label="Confirm New Password" handleChange={() => {}} />
            <Input type="text" id="" name="" label="Current Password" handleChange={() => {}} />
            <Button type="submit" text="Submit" handleClick={() => {}} />
            <Button type="button" text="Cancel" handleClick={() => {}} />
          </Form>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
