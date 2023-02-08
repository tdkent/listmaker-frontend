import { Form } from "react-router-dom";

const RegisterUser = () => {
  return (
    <Form method="post" action="/user-auth">
      <label>
        <span>Email Address:</span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>Username:</span>
        <input type="text" name="username" />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" name="password" required />
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default RegisterUser;

export const registerUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data = {
    userEmail: req.get("email"),
    username: req.get("username"),
    password: req.get("password"),
  };
  console.log("auth data", data);
  return null;
};
