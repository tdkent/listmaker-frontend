import { useContext, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useError from "../../hooks/useError";
import { FormValidationInt } from "../../models/errors";
import AuthContext from "../../context/AuthContext";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { LoginInputsEnum } from "../../models/auth";
import { ReducerActionInt } from "../../models/reducers";
import { login } from "../../api/auth";

const LoginForm = () => {
  // errors
  const { setFetchError } = useError();
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // form reducer
  const defaultState = {
    userEmail: "",
    userPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === LoginInputsEnum.email) {
      return { ...state, userEmail: action.payload };
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
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: (data) => {
      const { token, userId } = data.userData;
      auth.login(token, userId);
      navigate("/lists");
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check for form validation errors
    // TODO: validation error component
    if (!state.userEmail.length || !state.userEmail.match(/[@]/)) {
      return setFormError({
        type: LoginInputsEnum.email,
        message: "Please enter a valid email address.",
      });
    }
    if (state.userPassword.length < 4) {
      return setFormError({
        type: LoginInputsEnum.password,
        message: "Your password should be at least 8 characters long!",
      });
    }

    mutation.mutate();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name={LoginInputsEnum.email}
          type="text"
          id={LoginInputsEnum.email}
          handleChange={handleChange}
        />
        {formError && formError.type === LoginInputsEnum.email && <span>{formError.message}</span>}
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
    </div>
  );
};

export default LoginForm;
