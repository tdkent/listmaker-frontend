import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
// import { newItem } from "../../api/mutate-lists";
import { EditListInputsEnum } from "../../models/lists";
import Input from "../forms/Input";
import Button from "../forms/Button";

interface NewItemProps {
  token: string;
  id: number;
}

const NewItem = ({ token, id }: NewItemProps) => {
  const { setFetchError } = useError();
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    // mutationFn: () => newItem(id, itemName, token),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", id]);
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

export default NewItem;