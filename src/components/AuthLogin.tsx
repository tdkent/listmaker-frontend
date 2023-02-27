import { Form, useActionData } from "react-router-dom";
import { useContext, useReducer } from "react";

import { AuthFormErrorInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { AuthReducerActionInt, LoginInputsEnum } from "../models/auth";

const AuthLogin = () => {
  const actionData = useActionData();
  const errors: AuthFormErrorInt = actionData as AuthFormErrorInt;

  const defaultState = {
    userNameOrEmail: "",
    userPassword: "",
  };

  const reducer = (state: typeof defaultState, action: AuthReducerActionInt) => {
    if (action.type === LoginInputsEnum.user) {
      return { ...state, userNameOrEmail: action.payload };
    }
    if (action.type === LoginInputsEnum.password) {
      return { ...state, userPassword: action.payload };
    }
    throw new Error("No matching action type!");
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };
  const auth = useContext(AuthContext);
  console.log("auth: ", auth);
  const handleSubmit = async () => {
    try {
      //TODO: error handling
      auth.login("dummytokenstring", 1);
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

export default AuthLogin;
