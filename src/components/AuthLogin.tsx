import { Form, useActionData } from "react-router-dom";
import { useContext, useReducer, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthFormErrorInt } from "../models/errors";
import AuthContext from "../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { AuthReducerActionInt, LoginInputsEnum } from "../models/auth";
import { login } from "../api/auth";

const AuthLogin = () => {
  // form validation
  const actionData = useActionData();
  const errors: AuthFormErrorInt = actionData as AuthFormErrorInt;

  // fetch error
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    const response = await login(state);
    console.log("response: ", response);
    if (response.statusText !== "OK") {
      setError(response.statusText);
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
        {errors?.email && <span>{errors.email}</span>}
        <FormInput
          labelText="Password"
          inputType="text"
          inputName={LoginInputsEnum.password}
          handleChange={handleChange}
        />
        {errors?.password && <span>{errors.password}</span>}
        <Button buttonText="Log in" buttonType="submit" />
      </Form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default AuthLogin;
