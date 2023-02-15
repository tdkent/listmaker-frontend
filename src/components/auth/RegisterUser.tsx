import React, { useContext, useReducer } from "react";
import { Form, useActionData } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import { TEST_DB } from "../../constants/global";
import AuthFormValidationError from "../../models/user-auth";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import {
  RegUserStateInterface,
  RegUserInputsEnum,
} from "../../models/register-user";

const RegisterUser = () => {
  const actionData = useActionData();
  const errors: AuthFormValidationError = actionData as AuthFormValidationError;

  const defaultRegisterState: RegUserStateInterface = {
    userEmail: "",
    userName: "",
    userPassword: "",
    verifyPassword: "",
  };

  const reducer = (state: RegUserStateInterface, action: any) => {
    if (action.type === RegUserInputsEnum.email) {
      return { ...state, userEmail: action.payload.value };
    }
    if (action.type === RegUserInputsEnum.username) {
      return { ...state, userName: action.payload.value };
    }
    if (action.type === RegUserInputsEnum.password) {
      return { ...state, userPassword: action.payload.value };
    }
    if (action.type === RegUserInputsEnum.verify) {
      return { ...state, verifyPassword: action.payload.value };
    }
    throw new Error(`No matching "${action.type}" - action type`);
  };

  const [state, dispatch] = useReducer(reducer, defaultRegisterState);
  console.log("state: ", state);

  const auth = useContext(AuthContext);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: {
        value: e.currentTarget.value,
      },
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    //? e.preventDefault(); <-- is this necessary?
    const response = await fetch(`${TEST_DB}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
      }),
    });
    if (!response.ok) {
      //TODO: error handling
    }
    // db will return userId and token
    auth.login("dummytoken", 777);
  };

  return (
    <Form method="post" action="/register" onSubmit={handleSubmit}>
      <FormInput
        labelText="Email"
        inputType="text"
        inputName={RegUserInputsEnum.email}
        handleChange={handleChange}
      />
      {errors?.email && <span>{errors.email}</span>}
      <FormInput
        labelText="Username"
        inputType="text"
        inputName={RegUserInputsEnum.username}
        handleChange={handleChange}
      />
      {errors?.username && <span>{errors.username}</span>}
      <FormInput
        labelText="Password"
        inputType="text"
        inputName={RegUserInputsEnum.password}
        handleChange={handleChange}
      />
      <FormInput
        labelText="Verify Password"
        inputType="text"
        inputName={RegUserInputsEnum.verify}
        handleChange={handleChange}
      />
      {errors?.password && <span>{errors.password}</span>}
      <Button buttonText="Sign up" buttonType="submit" />
    </Form>
  );
};

export default RegisterUser;
