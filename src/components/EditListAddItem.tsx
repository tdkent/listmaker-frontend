import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addItemToList } from "../api/mutate-lists";
import { ShoppingListInt } from "../models/lists";

interface HeaderProps {
  listId: number;
  list: ShoppingListInt;
}
const EditListAddItem = ({ listId, list }: HeaderProps) => {
  const [itemName, setItemName] = useState("");

  const queryClient = useQueryClient();
  const addItemMutation = useMutation({
    mutationFn: () => addItemToList(listId, list, itemName),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", listId]);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addItemMutation.mutate();
  };
  return (
    <div style={{ border: "1px green dashed", padding: "1rem", margin: "1rem 0" }}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={itemName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setItemName(e.currentTarget.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EditListAddItem;
