import React, { useContext, useReducer, useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import AuthContext from "../context/AuthContext";
import { AuthFormErrorInt } from "../models/errors";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import ErrorDisplay from "./ErrorDisplay";
import { ErrorDisplayInt } from "../models/errors";
import { RegisterInputsEnum, AuthReducerActionInt, AuthResponseInt } from "../models/auth";
import { register } from "../api/auth";

const AuthRegister = () => {
  // form validation
  const actionData = useActionData();
  const errors: AuthFormErrorInt = actionData as AuthFormErrorInt;
  // console.log("errors: ", errors);

  // fetch error
  const [error, setError] = useState<ErrorDisplayInt | null>(null);
  useEffect(() => {
    if (error) {
      toast.error(<ErrorDisplay error={error} />);
    }
  }, [error]);

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
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };
  const auth = useContext(AuthContext);
  const handleSubmit = async () => {
    if (errors.isError === false) {
      const response = await register(state);
      console.log("response: ", response);
      if (response.statusText !== "OK") setError(response);
      else {
        const userId = response.data!.id;
        console.log("userId: ", userId);
        // auth.login("dummytokenstring", userId);
      }
    }
  };

  return (
    <>
      <Form method="post" action="/register" onSubmit={handleSubmit}>
        <FormInput
          labelText="Email"
          inputType="text"
          inputName={RegisterInputsEnum.email}
          handleChange={handleChange}
        />
        {errors?.errorType === RegisterInputsEnum.email && <span>{errors.errorMessage}</span>}
        <FormInput
          labelText="Username"
          inputType="text"
          inputName={RegisterInputsEnum.username}
          handleChange={handleChange}
        />
        {errors?.errorType === RegisterInputsEnum.username && <span>{errors.errorMessage}</span>}
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
        {errors?.errorType === RegisterInputsEnum.password && <span>{errors.errorMessage}</span>}
        <FormButton buttonText="Sign up" buttonType="submit" />
      </Form>
      <ToastContainer />
    </>
  );
};

export default AuthRegister;
