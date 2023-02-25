import { useMutation, useQueryClient } from "@tanstack/react-query";

import { selectCheckbox } from "../api/mutate-lists";
import { ShoppingListInt } from "../models/lists";

interface DisplayItemsProps {
  listId: number;
  list: ShoppingListInt;
}

const EditListDisplayItems = ({ listId, list }: DisplayItemsProps) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (itemId: number) => selectCheckbox(itemId, listId, list),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });

  return (
    <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
      <ul>
        {list.items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.isDone} onChange={() => mutate.mutate(item.id)} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditListDisplayItems;
