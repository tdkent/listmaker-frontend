import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import { newTodoItem } from "../../../api/mutate-todo-items";
import { EditListInputsEnum } from "../../../models/lists";
import Form from "../../forms/Form";
import Input from "../../forms/Input";
import Button from "../../forms/Button";
import { CustomStylesEnum } from "../../../models/styles";

interface NewTodoItemProps {
  token: string;
  listId: number;
}

const NewTodoItem = ({ token, listId }: NewTodoItemProps) => {
  const { setFetchError } = useError();
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => newTodoItem(listId, itemName, token),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;
    mutation.mutate();
  };
  return (
    <div className="my-6">
      <Form id="new-todo-item-form" onSubmit={submitHandler}>
        <Input
          label="New to-do"
          type="text"
          name={EditListInputsEnum.newItem}
          id={EditListInputsEnum.newItem}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) =>
            setItemName(e.currentTarget.value)
          }
        />
        <Button
          type="submit"
          text="Add"
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-0`}
        />
      </Form>
    </div>
  );
};

export default NewTodoItem;
