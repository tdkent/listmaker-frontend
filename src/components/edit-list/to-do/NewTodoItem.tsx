import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { newTodoItem } from "../../../api/mutate-todo-items";
import Form from "../../forms/Form";
import Input from "../../forms/Input";
import Button from "../../forms/Button";
import { CustomStylesEnum } from "../../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../../models/forms";
import { checkNameBlank } from "../../../utils/form-validation";
import ErrorContext from "../../../context/ErrorContext";

interface NewTodoItemProps {
  token: string;
  listId: number;
}

const NewTodoItem = ({ token, listId }: NewTodoItemProps) => {
  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // mutation
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => newTodoItem(listId, itemName, token),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItemName(e.currentTarget.value);
    setIsError(false);
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkNameBlank(itemName)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.newTodoName);
    }
    mutation.mutate();
  };
  return (
    <div className="my-6">
      <Form id={FormIdsEnum.newTodoItem} onSubmit={submitHandler}>
        <Input
          label="Name"
          type="text"
          id={InputIdsEnum.newTodoName}
          value={itemName}
          required={true}
          handleChange={handleChange}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.nameBlank}
        />
        <Button
          type="submit"
          text="Add Item"
          disabled={active}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-2`}
        />
      </Form>
    </div>
  );
};

export default NewTodoItem;
