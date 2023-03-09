import React, { useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import { RegisterInputsEnum, AuthReducerActionInt } from "../models/auth";
import { AuthFormValidationInt } from "../models/errors";
import { register } from "../api/auth";
import ToastError from "./ToastError";
import Input from "./forms/Input";
import Button from "./forms/Button";

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
    throw new Error(`No matching "${action.type}" action type`);
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
    onError: (error: AxiosError) => setResponseError(error),
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
    // TODO: validation error component
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
        <Input
          label="Email"
          name={RegisterInputsEnum.email}
          type="email"
          id={RegisterInputsEnum.email}
          handleChange={handleChange}
        />
        {/* //TODO: Error message component */}
        {formError && formError.type === RegisterInputsEnum.email && (
          <span>{formError.message}</span>
        )}
        <Input
          label="Username"
          name={RegisterInputsEnum.username}
          type="text"
          id={RegisterInputsEnum.username}
          handleChange={handleChange}
        />
        {formError && formError.type === RegisterInputsEnum.username && (
          <span>{formError.message}</span>
        )}
        {/* // TODO: change type to password */}
        <Input
          label="Password"
          name={RegisterInputsEnum.password}
          type="text"
          id={RegisterInputsEnum.password}
          handleChange={handleChange}
        />
        <Input
          label="Verify Password"
          name={RegisterInputsEnum.verify}
          type="text"
          id={RegisterInputsEnum.verify}
          handleChange={handleChange}
        />
        {formError && formError.type === RegisterInputsEnum.password && (
          <span>{formError.message}</span>
        )}
        <Button type="submit" text="Sign up" />
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthRegister;
