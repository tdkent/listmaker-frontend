import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editNickname } from "../../api/user";
import { CustomStylesEnum } from "../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { checkNickname } from "../../utils/form-validation";
import successToast from "../../utils/success-toast";
import { StorageDataInt } from "../../utils/check-local-storage";

interface Props {
  userNickname: string;
  setEditNickname: (value: React.SetStateAction<boolean>) => void;
}

const EditNicknameForm = ({ userNickname, setEditNickname }: Props) => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // form submission
  const [newName, setNewName] = useState(userNickname);
  const mutation = useMutation({
    mutationFn: () => editNickname(newName, auth.token as string),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", auth.userId]);
      successToast("Nickname updated!");
      const userData: StorageDataInt = JSON.parse(localStorage.getItem("userData")!);
      localStorage.setItem("userData", JSON.stringify({ ...userData, userNickname: newName }));
    },
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
    setIsError(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkNickname(newName)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editNickname);
    }
    mutation.mutate();
    setEditNickname(false);
  };
  const handleCancel = () => {
    setIsError(false);
    setEditNickname(false);
  };

  return (
    <div>
      <span className="text-lg font-medium mr-4">Change Nickname</span>
      <p className="my-4">
        Nicknames can be 1-18 characters long. You may delete your nickname by leaving the field
        blank.
      </p>
      <Form id={FormIdsEnum.editNickname} onSubmit={handleSubmit}>
        <Input
          type="text"
          id={InputIdsEnum.editNickname}
          label="New Nickname"
          value={newName}
          handleChange={handleChange}
          required={false}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.nickname}
        />
        <Button
          type="submit"
          text="Save"
          disabled={active}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
        <Button
          type="button"
          text="Cancel"
          handleClick={handleCancel}
          styles={`${CustomStylesEnum.btnCancel} mb-2`}
        />
      </Form>
    </div>
  );
};

export default EditNicknameForm;
