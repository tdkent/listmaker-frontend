import React, { useContext, useReducer } from "react";
import { Form, useActionData } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import { TEST_DB } from "../../constants/global";
import AuthFormValidationError from "../../models/user-auth";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import {
  RegisterDefStateInt,
  RegisterInputsEnum,
} from "../../models/register-user";

const RegisterUser = () => {
  const actionData = useActionData();
  const errors: AuthFormValidationError = actionData as AuthFormValidationError;

  const defaultRegisterState: RegisterDefStateInt = {
    userEmail: "",
    userName: "",
    userPassword: "",
    verifyPassword: "",
  };

  const reducer = (state: RegisterDefStateInt, action: any) => {
    if (action.type === RegisterInputsEnum.email) {
      return { ...state, userEmail: action.payload.input };
    }
    if (action.type === RegisterInputsEnum.username) {
      return { ...state, userName: action.payload.input };
    }
    if (action.type === RegisterInputsEnum.password) {
      return { ...state, userPassword: action.payload.input };
    }
    if (action.type === RegisterInputsEnum.verify) {
      return { ...state, verifyPassword: action.payload.input };
    }
    throw new Error(`No matching "${action.type}" - action type`);
  };

  const [state, dispatch] = useReducer(reducer, defaultRegisterState);

  const auth = useContext(AuthContext);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: {
        input: e.currentTarget.value,
      },
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    //? e.preventDefault();
    const response = await fetch(`${TEST_DB}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
      }),
    });
    // db responds with error or userId and token
    if (!response.ok) {
      //TODO: error handling
    }
    auth.login("dummytoken", "fakeuserid");
    // TODO: initiate redirect to the user's lists page
  };

  return (
    <Form method="post" action="/register" onSubmit={handleSubmit}>
      <FormInput
        labelText="Email"
        inputType="text"
        inputName={RegisterInputsEnum.email}
        handleChange={handleChange}
      />
      {errors?.email && <span>{errors.email}</span>}
      <FormInput
        labelText="Username"
        inputType="text"
        inputName={RegisterInputsEnum.username}
        handleChange={handleChange}
      />
      {errors?.username && <span>{errors.username}</span>}
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
      {errors?.password && <span>{errors.password}</span>}
      <Button buttonText="Sign up" buttonType="submit" />
    </Form>
  );
};

export default RegisterUser;
