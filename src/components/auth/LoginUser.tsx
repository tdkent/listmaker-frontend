import { Form, useActionData } from "react-router-dom";
import { useContext, useReducer } from "react";

import AuthFormValidationError from "../../models/user-auth";
import AuthContext from "../../context/AuthContext";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { LoginInputsEnum, LoginDefStateInt } from "../../models/login-user";

const LoginUser = () => {
  const actionData = useActionData();
  const errors: AuthFormValidationError = actionData as AuthFormValidationError;

  const defaultLoginState: LoginDefStateInt = {
    userNameOrEmail: "",
    userPassword: "",
  };

  const reducer = (state: typeof defaultLoginState, action: any) => {
    if (action.type === LoginInputsEnum.user) {
      return { ...state, userNameOrEmail: action.payload.input };
    }
    if (action.type === LoginInputsEnum.password) {
      return { ...state, userPassword: action.payload.input };
    }
    throw new Error("No matching action type!");
  };

  const [state, dispatch] = useReducer(reducer, defaultLoginState);
  console.log("state: ", state);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: { input: e.currentTarget.value },
    });
  };
  const auth = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    //? e.preventDefault()
    try {
      // credentials {...state} sent to db. db responds with nomatch error or token, userId
      //TODO: error handling
      auth.login("dummytokenstring", 777);
      //TODO: initiate redirect to user's list page
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form method="post" action="/login" onSubmit={handleSubmit}>
      <FormInput
        labelText="Username or Email"
        inputType="text"
        inputName={LoginInputsEnum.user}
        handleChange={handleChange}
      />
      {errors?.email && <span>{errors.email}</span>}
      <FormInput
        labelText="Password"
        inputType="text"
        inputName={LoginInputsEnum.password}
        handleChange={handleChange}
      />
      {errors?.password && <span>{errors.password}</span>}
      <Button buttonText="Log in" buttonType="submit" />
    </Form>
  );
};

export default LoginUser;
