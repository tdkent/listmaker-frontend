import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editListName } from "../api/mutate-lists";
import { ShoppingListInt } from "../models/lists";

interface DisplayItemsProps {
  list: ShoppingListInt;
}

const EditListDisplayItems = ({ list }: DisplayItemsProps) => {
  const [formBody, setFormBody] = useState(list);
  const queryClient = useQueryClient();
  const listId = list.id;
  // const listMutation = useMutation({
  //   mutationFn: () => editListName(list.id, formBody),
  //   onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  // });

  const items = list.items;
  return (
    <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={(e: React.FormEvent) => {
                e.preventDefault();

                // const body = { ...list, items: { ...items, updateItem } };
                // setFormBody(body);
                // listMutation.mutate();
              }}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditListDisplayItems;
