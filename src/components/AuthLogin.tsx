import { useContext, useReducer, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { FormValidationInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import Input from "./forms/Input";
import Button from "./forms/Button";
import { LoginInputsEnum } from "../models/auth";
import { ReducerActionInt } from "../models/reducers";
import { login } from "../api/auth";
import ToastError from "./ToastError";

const AuthLogin = () => {
  // errors
  const [formError, setFormError] = useState<FormValidationInt | null>(null);
  const [responseError, setResponseError] = useState<AxiosError>();
  useEffect(() => {
    if (responseError) {
      toast.error(<ToastError error={responseError} />);
    }
  }, [responseError]);

  // form reducer
  const defaultState = {
    userNameOrEmail: "",
    userPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === LoginInputsEnum.user) {
      return { ...state, userNameOrEmail: action.payload };
    }
    if (action.type === LoginInputsEnum.password) {
      return { ...state, userPassword: action.payload };
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
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => login(state),
    onError: (error: AxiosError) => setResponseError(error),
    onSuccess: (data) => {
      //TODO: API will return a real jwt
      auth.login("dummytokenstring", data.id);
      navigate("/lists");
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check for form validation errors
    // TODO: validation error component
    if (!state.userNameOrEmail.length) {
      return setFormError({
        type: LoginInputsEnum.user,
        message: "Please enter your username or email.",
      });
    }
    if (state.userPassword.length < 4) {
      return setFormError({
        type: LoginInputsEnum.password,
        message: "Your password should be at least 4 characters long!",
      });
    }

    // request if no form errors
    mutation.mutate();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username Or Email"
          name={LoginInputsEnum.user}
          type="text"
          id={LoginInputsEnum.user}
          handleChange={handleChange}
        />
        {formError && formError.type === LoginInputsEnum.user && <span>{formError.message}</span>}
        <Input
          label="Password"
          name={LoginInputsEnum.password}
          type="text"
          id={LoginInputsEnum.password}
          handleChange={handleChange}
        />
        {formError && formError.type === LoginInputsEnum.password && (
          <span>{formError.message}</span>
        )}
        <Button type="submit" text="Log in" />
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthLogin;
