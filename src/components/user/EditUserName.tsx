import { useContext, useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import { UserInfoInt } from "../../models/user";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { UserProfileEnum } from "../../models/user";
import { editUserProfile } from "../../api/user";
import { ReducerActionInt } from "../../models/reducers";

interface EditUserNameProps {
  data: UserInfoInt;
}

const EditUserName = ({ data }: EditUserNameProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { setFetchError } = useError();

  // reducer
  const defaultState: UserInfoInt = {
    id: data.id,
    userEmail: data.userEmail,
    userName: data.userName,
    userPassword: data.userPassword,
  };
  // TODO: add additional fields to be edited
  const reducer = (state: UserInfoInt, action: ReducerActionInt) => {
    if (action.type === UserProfileEnum.username) {
      return { ...state, userName: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  // form submission
  const mutation = useMutation({
    mutationFn: (state: UserInfoInt) => editUserProfile(state, auth.token as string),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => navigate("/profile"),
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    // TODO: add onscreen form validation
    if (!state.userName) alert("Please enter a username");

    // submission
    mutation.mutate(state);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name={UserProfileEnum.username}
          id={UserProfileEnum.username}
          label="Username"
          value={state.userName}
          handleChange={handleChange}
        />
        <Button type="submit" text="Submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditUserName;
