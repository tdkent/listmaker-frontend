import { useState } from "react";
import { Form, Link } from "react-router-dom";

const AuthenticateUser = () => {
  const [newAcct, setNewAcct] = useState(true);
  const handleClick = () => {
    setNewAcct((prev) => !prev);
  };
  return (
    <div>
      <h2>Create New Account</h2>
      <Form method="post" action="/">
        <div>
          <label>
            <span>Email:</span>
            <input type="email" name="email" required />
          </label>
        </div>
        {newAcct && (
          <div>
            <label>
              <span>Username (optional):</span>
              <input type="text" name="username" />
            </label>
          </div>
        )}
        <div>
          <label>
            <span>Password:</span>
            <input type="text" name="password" required />
          </label>
        </div>
        {newAcct && (
          <div>
            <label>
              <span>Verify Password:</span>
              <input type="text" name="verify-password" required />
            </label>
          </div>
        )}
        <button type="submit">Submit</button>
      </Form>
      <div>
        {newAcct ? (
          <p>
            Already have an account?{" "}
            <Link to="#" onClick={handleClick}>
              Log in instead.
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link to="#" onClick={handleClick}>
              Create a new account.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthenticateUser;

export const authUserAction = async ({ request }: any) => {
  const data = await request.formData();
  const formData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log("form data: ", formData);
  return null;
};
