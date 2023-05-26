import { useContext, useReducer, useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";
import { login } from "../../api/auth";
import { checkIsEmail, checkPasswordLength } from "../../utils/form-validation";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";

const LoginForm = () => {
  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // reducer
  const defaultState = {
    userEmail: "",
    userPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === InputIdsEnum.loginEmail) {
      return { ...state, userEmail: action.payload };
    }
    if (action.type === InputIdsEnum.loginPass) {
      return { ...state, userPassword: action.payload };
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
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => login(state),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
    onSuccess: (data) => {
      auth.login(data.token, data.userId, data.userNickname);
      navigate("/lists");
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // form validation
    if (!checkIsEmail(state.userEmail)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.loginEmail);
    }
    if (!checkPasswordLength(state.userPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.loginPass);
    }
    // mutate
    mutation.mutate();
  };
  return (
    <div className="my-6">
      <Form id={FormIdsEnum.login} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          id={InputIdsEnum.loginEmail}
          handleChange={handleChange}
          required={true}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.email}
        />
        <Input
          label="Password"
          type="password"
          id={InputIdsEnum.loginPass}
          handleChange={handleChange}
          required={true}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.passLength}
        />
        <Button
          type="submit"
          text="Log in"
          disabled={active}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
