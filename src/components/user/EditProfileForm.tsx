import { useContext, useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import { EditProfileReqInt, EditProfileFormEnum } from "../../models/user";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editUserProfile } from "../../api/user";
import { ReducerActionInt } from "../../models/reducers";

interface EditProfileFormProps {
  user: EditProfileReqInt;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { setFetchError } = useError();

  // reducer
  // TODO: add additional fields to be edited
  const defaultState = { userNickname: user.userNickname };

  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === EditProfileFormEnum.nickname) {
      return { ...state, userNickname: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  // form submission
  const mutation = useMutation({
    mutationFn: (state: typeof defaultState) => editUserProfile(state, auth.token as string),
    onError: (error: AxiosError) => {
      setFetchError(error);
    },
    onSuccess: () => {
      navigate("/profile");
    },
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name={EditProfileFormEnum.nickname}
          id={EditProfileFormEnum.nickname}
          label="Nickname"
          value={state.userNickname}
          handleChange={handleChange}
        />
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default EditProfileForm;
