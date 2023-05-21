import { useReducer, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import { ReducerActionInt } from "../../models/reducers";
import { ChangePasswordInputsEnum } from "../../models/user";
import { CustomStylesEnum } from "../../models/styles";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editPassword } from "../../api/user";

interface Props {
  setEditPassword: (value: React.SetStateAction<boolean>) => void;
}

const EditPasswordForm = ({ setEditPassword }: Props) => {
  const auth = useContext(AuthContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();

  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");
  // reducer
  const defaultState = {
    newPassword: "",
    verifyPassword: "",
    currentPassword: "",
  };

  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === ChangePasswordInputsEnum.new) {
      return { ...state, newPassword: action.payload };
    }
    if (action.type === ChangePasswordInputsEnum.ver) {
      return { ...state, verifyPassword: action.payload };
    }
    if (action.type === ChangePasswordInputsEnum.curr) {
      return { ...state, currentPassword: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const mutation = useMutation({
    mutationFn: () => editPassword(state.newPassword, state.currentPassword, auth.token!),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => queryClient.invalidateQueries(["user", auth.userId]),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch({
      type: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.newPassword !== state.verifyPassword) {
      setIsError(true);
      return setErrorId(ChangePasswordInputsEnum.ver);
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
        <Form id="change-password-form" onSubmit={handleSubmit}>
          <Input
            type="password"
            id={ChangePasswordInputsEnum.new}
            name={ChangePasswordInputsEnum.new}
            label="New Password"
            handleChange={handleChange}
            required={true}
          />
          <Input
            type="password"
            id={ChangePasswordInputsEnum.ver}
            name={ChangePasswordInputsEnum.ver}
            label="Confirm New Password"
            handleChange={handleChange}
            isError={isError}
            errorId={errorId}
            errorString={"Password confirmation does not match."}
            required={true}
          />
          <Input
            type="password"
            id={ChangePasswordInputsEnum.curr}
            name={ChangePasswordInputsEnum.curr}
            label="Current Password"
            handleChange={handleChange}
            required={true}
          />
          <Button
            type="submit"
            text="Save"
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-0`}
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
