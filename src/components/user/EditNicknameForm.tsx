import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import { EditProfileReqInt, EditProfileFormEnum } from "../../models/user";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editUserProfile, editNickname } from "../../api/user";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";

interface Props {
  userNickname: string;
  setEditNickname: (value: React.SetStateAction<boolean>) => void;
}

const EditNicknameForm = ({ userNickname, setEditNickname }: Props) => {
  const auth = useContext(AuthContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();

  const [newName, setNewName] = useState(userNickname);

  // form submission
  const mutation = useMutation({
    mutationFn: () => editNickname(newName, auth.token as string),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => queryClient.invalidateQueries(["user", auth.userId]),
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
    setEditNickname(false);
  };

  return (
    <div>
      <span className="text-lg font-medium mr-4">Change Nickname</span>
      <p className="my-4">Nicknames can be 1-24 characters long.</p>
      <Form id="edit-nickname-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name={EditProfileFormEnum.nickname}
          id={EditProfileFormEnum.nickname}
          label="New Nickname"
          value={newName}
          handleChange={handleChange}
          required={false}
        />
        <Button
          type="submit"
          text="Submit"
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-0`}
        />
        <Button
          type="button"
          text="Cancel"
          handleClick={() => setEditNickname(false)}
          styles={`${CustomStylesEnum.btnCancel} mb-2`}
        />
      </Form>
    </div>
  );
};

export default EditNicknameForm;
