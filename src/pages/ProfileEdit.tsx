import { useLoaderData, Form } from "react-router-dom";

import User from "../models/user";

const ProfileEdit = () => {
  // data will probably just be grabbed from state instead.
  const data = useLoaderData();
  const userData: User = (data as User[])[0];
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
