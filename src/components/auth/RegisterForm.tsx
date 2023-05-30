import React, { useReducer, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../context/ErrorContext";
import {
  checkIsEmail,
  checkNickname,
  checkPasswordLength,
  checkConfirmPassword,
} from "../../utils/form-validation";
import successToast from "../../utils/success-toast";
import { FormErrorsEnum, FormIdsEnum, InputIdsEnum } from "../../models/forms";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";
import { register } from "../../api/auth";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Hyperlink from "../forms/Hyperlink";

const RegisterForm = () => {
  // error handling
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // reducer
  const defaultState = {
    userEmail: "",
    userNickname: "",
    userPassword: "",
    verifyPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === InputIdsEnum.regEmail) {
      return { ...state, userEmail: action.payload };
    }
    if (action.type === InputIdsEnum.regName) {
      return { ...state, userNickname: action.payload };
    }
    if (action.type === InputIdsEnum.regPass) {
      return { ...state, userPassword: action.payload };
    }
    if (action.type === InputIdsEnum.regConfirm) {
      return { ...state, verifyPassword: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch({
      type: e.currentTarget.id,
      payload: e.currentTarget.value,
    });
  };

  // mutation
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => register(state),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
    onSuccess: () => {
      successToast("New account created!");
      navigate("/login");
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // form validation
    if (!checkIsEmail(state.userEmail)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.regEmail);
    }
    if (!checkNickname(state.userNickname)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.regName);
    }
    if (!checkPasswordLength(state.userPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.regPass);
    }
    if (!checkConfirmPassword(state.userPassword, state.verifyPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.regConfirm);
    }
    // mutate
    mutation.mutate();
  };

  return (
    <div className="my-6 lg:my-8">
      <Form id={FormIdsEnum.reg} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          id={InputIdsEnum.regEmail}
          handleChange={handleChange}
          required={true}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.email}
        />
        <Input
          label="Nickname"
          type="text"
          id={InputIdsEnum.regName}
          handleChange={handleChange}
          required={false}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.nickname}
        />
        <Input
          label="Password"
          type="password"
          id={InputIdsEnum.regPass}
          handleChange={handleChange}
          required={true}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.passLength}
        />
        <Input
          label="Verify Password"
          type="password"
          id={InputIdsEnum.regConfirm}
          handleChange={handleChange}
          required={true}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.passConfirm}
        />
        <Button
          type="submit"
          text="Sign up"
          disabled={active}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
      </Form>
      <div>
        <p className="my-8 pl-1">
          Already have an account? <Hyperlink to="/login">Log in</Hyperlink>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
