import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import {
  checkIsEmail,
  checkNickname,
  checkPasswordLength,
  checkConfirmPassword,
} from "../../utils/form-validation";
import { FormErrorsEnum, FormIdsEnum, InputIdsEnum } from "../../models/forms";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";
import { register } from "../../api/auth";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";

const RegisterForm = () => {
  // error handling
  const { setFetchError } = useError();
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
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => {
      toast.success("New account created! Please log in.", {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    <div className="my-6">
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
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
      </Form>
    </div>
  );
};

export default RegisterForm;
