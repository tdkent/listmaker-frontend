import { Form, useActionData } from "react-router-dom";

import AuthFormValidationError from "../../models/user-auth";

const LoginUser = () => {
  const actionData = useActionData();
  const errors: AuthFormValidationError = actionData as AuthFormValidationError;
  return (
    <Form method="post" action="/login">
      <div>
        <label>
          <span>Email:</span>
          <input type="text" name="email" />
        </label>
        {errors?.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          <span>Password:</span>
          <input type="text" name="password" />
        </label>
        {errors?.password && <span>{errors.password}</span>}
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </Form>
  );
};

export default LoginUser;
