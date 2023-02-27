import { useContext, useEffect } from "react";
import { useLoaderData, Form, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { UserInfoInt } from "../models/user";
import checkLocalStorage from "../functions/check-local-storage";

const ProfileEdit = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn]);

  // data will probably just be grabbed from state instead.
  // const data = useLoaderData();
  // const userData: UserInfoInt = (data as UserInfoInt[])[0];
  return (
    <div>
      <h2>Edit Your Profile</h2>
      <div>
        <Form method="patch" action="/profile/edit">
          <div>
            <label>
              <span>Email:</span>
              <input type="text" name="email" />
            </label>
          </div>
          <div>
            <label>
              <span>Username:</span>
              <input type="text" name="username" />
            </label>
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEdit;
