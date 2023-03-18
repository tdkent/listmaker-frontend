import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import { addItemToList } from "../../api/mutate-lists";
import {
  ShoppingListInt,
  ShoppingListItemInt,
  EditListInputsEnum,
  EditListPropsInt,
} from "../../models/lists";
import Input from "../forms/Input";
import Button from "../forms/Button";

const AddItem = ({ token, list }: EditListPropsInt) => {
  const { setFetchError } = useError();
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: ShoppingListInt) => addItemToList(token, body),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", list.id]);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: check if the item has already been added to the list?
    if (!itemName) return;
    const newItem: ShoppingListItemInt = {
      // TODO: update how item id's are being created
      id: list.items.length * Math.ceil(Math.random() * 100),
      name: itemName,
      isDone: false,
    };
    mutation.mutate({ ...list, items: [...list.items, newItem] });
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

export default AddItem;
