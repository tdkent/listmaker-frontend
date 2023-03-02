import { Form, useActionData } from "react-router-dom";
import { useContext, useReducer, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthFormErrorInt, ErrorDisplayInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./FormButton";
import ErrorDisplay from "./ErrorDisplay";
import { AuthReducerActionInt, LoginInputsEnum } from "../models/auth";
import { login } from "../api/auth";

const AuthLogin = () => {
  // form validation
  const actionData = useActionData();
  const errors = actionData as AuthFormErrorInt;
  console.log("errors: ", errors);

  // fetch error
  const [error, setError] = useState<ErrorDisplayInt | null>(null);
  useEffect(() => {
    if (error) {
      toast.error(<ErrorDisplay error={error} />);
    }
  }, [error]);

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
    throw new Error("No matching action type!");
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
    if (errors === undefined || errors?.isError === false) {
      const response = await login(state);
      if (response.statusText !== "OK") setError(response);
      else auth.login("dummytokenstring", response.data!.id);
    }
  };
  return (
    <>
      <Form method="post" action="/login" onSubmit={handleSubmit}>
        <FormInput
          labelText="Username or Email"
          inputType="text"
          inputName={LoginInputsEnum.user}
          handleChange={handleChange}
        />
        {errors?.errorType === LoginInputsEnum.user && <span>{errors.errorMessage}</span>}
        <FormInput
          labelText="Password"
          inputType="text"
          inputName={LoginInputsEnum.password}
          handleChange={handleChange}
        />
        {errors?.errorType === LoginInputsEnum.password && <span>{errors.errorMessage}</span>}
        <Button buttonText="Log in" buttonType="submit" />
      </Form>
      <ToastContainer />
    </>
  );
};

export default AuthLogin;
