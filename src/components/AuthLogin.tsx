import { useContext, useReducer, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AxiosErrorInfoInt, AuthFormValidationInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./FormButton";
import ErrorDisplay from "./ErrorDisplay";
import { AuthReducerActionInt, LoginInputsEnum } from "../models/auth";
import { login } from "../api/auth";

const AuthLogin = () => {
  // errors
  const [formError, setFormError] = useState<AuthFormValidationInt | null>(null);
  const [resError, setResError] = useState<AxiosErrorInfoInt | null>(null);
  useEffect(() => {
    if (resError) {
      toast.error(<ErrorDisplay error={resError} />);
    }
  }, [resError]);

  // form reducer
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

    // fetch request if no form errors
    const response = await login(state);
    if (response.statusText !== "OK") setResError(response);
    else {
      const userId = response.data!.id;
      auth.login("dummytokenstring", userId);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          labelText="Username or Email"
          inputType="text"
          inputName={LoginInputsEnum.user}
          handleChange={handleChange}
        />
        {formError && formError.type === LoginInputsEnum.user && <span>{formError.message}</span>}
        <FormInput
          labelText="Password"
          inputType="text"
          inputName={LoginInputsEnum.password}
          handleChange={handleChange}
        />
        {formError && formError.type === LoginInputsEnum.password && (
          <span>{formError.message}</span>
        )}
        <Button buttonText="Log in" buttonType="submit" />
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthLogin;
