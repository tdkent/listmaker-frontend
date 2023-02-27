import React, { useContext, useReducer } from "react";
import { Form, useActionData } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { AuthFormErrorInt } from "../models/errors";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { RegisterInputsEnum, AuthReducerActionInt } from "../models/auth";
import { register } from "../api/auth";

const AuthRegister = () => {
  // form validation
  const actionData = useActionData();
  const errors: AuthFormErrorInt = actionData as AuthFormErrorInt;

  // form reducer
  const defaultState = {
    userEmail: "",
    userName: "",
    userPassword: "",
    verifyPassword: "",
  };

  const reducer = (state: typeof defaultState, action: AuthReducerActionInt) => {
    if (action.type === RegisterInputsEnum.email) {
      return { ...state, userEmail: action.payload };
    }
    if (action.type === RegisterInputsEnum.username) {
      return { ...state, userName: action.payload };
    }
    if (action.type === RegisterInputsEnum.password) {
      return { ...state, userPassword: action.payload };
    }
    if (action.type === RegisterInputsEnum.verify) {
      return { ...state, verifyPassword: action.payload };
    }
    throw new Error(`No matching "${action.type}" - action type`);
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  // form submission
  const auth = useContext(AuthContext);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    const body = {
      userEmail: state.userEmail,
      userName: state.userName,
      userPassword: state.userPassword,
    };
    const response = await register(body);
    auth.login("dummytoken", response.id);
  };

  return (
    <Form method="post" action="/register" onSubmit={handleSubmit}>
      <FormInput
        labelText="Email"
        inputType="text"
        inputName={RegisterInputsEnum.email}
        handleChange={handleChange}
      />
      {errors?.email && <span>{errors.email}</span>}
      <FormInput
        labelText="Username"
        inputType="text"
        inputName={RegisterInputsEnum.username}
        handleChange={handleChange}
      />
      {errors?.username && <span>{errors.username}</span>}
      <FormInput
        labelText="Password"
        inputType="text"
        inputName={RegisterInputsEnum.password}
        handleChange={handleChange}
      />
      <FormInput
        labelText="Verify Password"
        inputType="text"
        inputName={RegisterInputsEnum.verify}
        handleChange={handleChange}
      />
      {errors?.password && <span>{errors.password}</span>}
      <FormButton buttonText="Sign up" buttonType="submit" />
    </Form>
  );
};

export default AuthRegister;
