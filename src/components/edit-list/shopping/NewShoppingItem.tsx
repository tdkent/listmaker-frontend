import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import { newShoppingItem } from "../../../api/mutate-shopping-items";
import { EditListInputsEnum } from "../../../models/lists";
import Input from "../../forms/Input";
import Button from "../../forms/Button";

interface NewShoppingItemProps {
  token: string;
  listId: number;
}

const NewShoppingItem = ({ token, listId }: NewShoppingItemProps) => {
  const { setFetchError } = useError();
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => newShoppingItem(listId, itemName, token),
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
    <div style={{ border: "1px green dashed", padding: "1rem", margin: "1rem 0" }}>
      <form onSubmit={submitHandler}>
        <Input
          label="Add a new item"
          type="text"
          name={EditListInputsEnum.newItem}
          id={EditListInputsEnum.newItem}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) =>
            setItemName(e.currentTarget.value)
          }
        />
        <Button type="submit" text="Add" />
      </form>
    </div>
  );
};

export default NewShoppingItem;
