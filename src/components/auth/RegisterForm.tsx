import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import { RegisterInputsEnum } from "../../models/auth";
import { FormValidationInt } from "../../models/errors";
import { ReducerActionInt } from "../../models/reducers";
import { register } from "../../api/auth";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useToast from "../../hooks/useToast";

const RegisterForm = () => {
  // error handling
  const { setFetchError } = useError();
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // reducer
  const defaultState = {
    userEmail: "",
    userNickname: "",
    userPassword: "",
    verifyPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === RegisterInputsEnum.email) {
      return { ...state, userEmail: action.payload };
    }
    if (action.type === RegisterInputsEnum.nickname) {
      return { ...state, userNickname: action.payload };
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
  const { setMsg } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => register(state),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => {
      // TODO: success toast
      //? TODO: auto-fill email field on login page
      navigate("/login");
      setMsg("New account created! Please log in.");
    },
  });
  // const auth = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check for form validation errors
    // TODO: validation error component
    // TODO: replace with better email check regex
    if (!state.userEmail.match(/[@]/)) {
      return setFormError({
        type: RegisterInputsEnum.email,
        message: "Please enter a valid email address.",
      });
    }
    // TODO: additional password checks
    if (state.userPassword.length < 8) {
      return setFormError({
        type: RegisterInputsEnum.password,
        message: "Please enter a password that is 8 or more characters long.",
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name={RegisterInputsEnum.email}
          type="text"
          id={RegisterInputsEnum.email}
          handleChange={handleChange}
        />
        {/* //TODO: Error message component */}
        {formError && formError.type === RegisterInputsEnum.email && (
          <span>{formError.message}</span>
        )}
        <Input
          label="Nickname"
          name={RegisterInputsEnum.nickname}
          type="text"
          id={RegisterInputsEnum.nickname}
          handleChange={handleChange}
        />
        {/* //! TODO: change type to password */}
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default RegisterForm;
