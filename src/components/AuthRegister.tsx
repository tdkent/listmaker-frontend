import React, { useContext, useReducer, useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import AuthContext from "../context/AuthContext";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import ErrorDisplay from "./ErrorDisplay";
import { RegisterInputsEnum, AuthReducerActionInt } from "../models/auth";
import { AuthFormValidationInt, AxiosErrorInfoInt } from "../models/errors";
import { register } from "../api/auth";

const AuthRegister = () => {
  // errors
  const [formError, setFormError] = useState<AuthFormValidationInt | null>(null);
  // const [resError, setResError] = useState<AxiosErrorInfoInt | null>(null);
  // useEffect(() => {
  //   if (resError) {
  //     toast.error(<ErrorDisplay error={resError} />);
  //   }
  // }, [resError]);

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check for form validation errors
    // TODO: componentize form validation errors
    if (!state.userEmail.match(/[@]/)) {
      return setFormError({
        type: RegisterInputsEnum.email,
        message: "Please enter a valid email address.",
      });
    }
    if (!state.userName || state.userName.length < 4) {
      return setFormError({
        type: RegisterInputsEnum.username,
        message: "Please enter a username that is 4 or more characters long.",
      });
    }
    if (state.userPassword.length < 4) {
      return setFormError({
        type: RegisterInputsEnum.password,
        message: "Please enter a password that is 4 or more characters long.",
      });
    }
    if (state.userPassword !== state.verifyPassword) {
      return setFormError({
        type: RegisterInputsEnum.password,
        message: "Passwords do not match. Please try again.",
      });
    }

    // fetch request if no form errors
    const response = await register(state);
    console.log("register result response: ", response);

    // if (response.statusText !== "OK") setResError(response);
    // else {
    //   const userId = response.data!.id;
    //   auth.login("dummytokenstring", userId);
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          labelText="Email"
          inputType="text"
          inputName={RegisterInputsEnum.email}
          handleChange={handleChange}
        />
        {formError && formError.type === RegisterInputsEnum.email && (
          <span>{formError.message}</span>
        )}
        <FormInput
          labelText="Username"
          inputType="text"
          inputName={RegisterInputsEnum.username}
          handleChange={handleChange}
        />
        {formError && formError.type === RegisterInputsEnum.username && (
          <span>{formError.message}</span>
        )}
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
        {formError && formError.type === RegisterInputsEnum.password && (
          <span>{formError.message}</span>
        )}
        <FormButton buttonText="Sign up" buttonType="submit" />
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthRegister;
