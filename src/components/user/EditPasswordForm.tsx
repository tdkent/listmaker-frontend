import { useReducer, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editPassword } from "../../api/user";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { checkPasswordLength, checkConfirmPassword } from "../../utils/form-validation";
import successToast from "../../utils/success-toast";

interface Props {
  setEditPassword: (value: React.SetStateAction<boolean>) => void;
}

const EditPasswordForm = ({ setEditPassword }: Props) => {
  const auth = useContext(AuthContext);

  // errors
  const { toggleError, provideData } = useContext(ErrorContext);

  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");
  // reducer
  const defaultState = {
    newPassword: "",
    verifyPassword: "",
    currentPassword: "",
  };

  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === InputIdsEnum.editPasswordNew) {
      return { ...state, newPassword: action.payload };
    }
    if (action.type === InputIdsEnum.editPasswordConfirm) {
      return { ...state, verifyPassword: action.payload };
    }
    if (action.type === InputIdsEnum.editPasswordCurrent) {
      return { ...state, currentPassword: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const mutation = useMutation({
    mutationFn: () => editPassword(state.newPassword, state.currentPassword, auth.token!),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
    onSuccess: () => successToast("Password updated!"),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch({
      type: e.currentTarget.id,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPasswordLength(state.newPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editPasswordNew);
    }
    if (!checkConfirmPassword(state.newPassword, state.verifyPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editPasswordConfirm);
    }
    if (!checkPasswordLength(state.currentPassword)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editPasswordCurrent);
    }
    mutation.mutate();
    setEditPassword(false);
  };

  return (
    <>
      <span className="text-lg font-medium mr-4">Change Password</span>
      <p className="my-4">
        Make sure your password is at least 8 characters and contains at least 1 uppercase letter, 1
        lowercase letter, and 1 number.
      </p>
      <div>
        <Form id={FormIdsEnum.editPassword} onSubmit={handleSubmit}>
          <Input
            type="password"
            id={InputIdsEnum.editPasswordNew}
            label="New Password"
            handleChange={handleChange}
            required={true}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.passLength}
          />
          <Input
            type="password"
            id={InputIdsEnum.editPasswordConfirm}
            label="Confirm New Password"
            handleChange={handleChange}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.passConfirm}
            required={true}
          />
          <Input
            type="password"
            id={InputIdsEnum.editPasswordCurrent}
            label="Current Password"
            handleChange={handleChange}
            required={true}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.passLength}
          />
          <Button
            type="submit"
            text="Save"
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
          />
          <Button
            type="button"
            text="Cancel"
            handleClick={() => setEditPassword(false)}
            styles={CustomStylesEnum.btnCancel}
          />
        </Form>
      </div>
    </>
  );
};

export default EditPasswordForm;
