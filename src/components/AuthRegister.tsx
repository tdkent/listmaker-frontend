import React, { useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { RegisterInputsEnum, AuthReducerActionInt } from "../models/auth";
import { AuthFormValidationInt } from "../models/errors";
import { register } from "../api/auth";
import ToastError from "./ToastError";

const AuthRegister = () => {
  // error handling
  const [formError, setFormError] = useState<AuthFormValidationInt | null>(null);
  const [responseError, setResponseError] = useState<AxiosError>();

  useEffect(() => {
    if (responseError) {
      toast.error(<ToastError error={responseError} />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [responseError]);

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
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => register(state),
    onError: (error: AxiosError) => {
      console.log("mutation error", error);
      setResponseError(error);
    },
    onSuccess: (data) => {
      //TODO: backend will return jwt token
      auth.login("samuelbarberstoken", data.id);
      navigate("/lists");
    },
  });

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

    // request if no form errors
    mutation.mutate();
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
