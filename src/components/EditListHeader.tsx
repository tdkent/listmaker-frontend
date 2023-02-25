import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ModalContext from "../context/ModalContext";
import { ShoppingListInt } from "../models/lists";
import { editListName } from "../api/mutate-lists";
import { EditListReducerActionInt } from "../models/edit-list";

interface HeaderProps {
  listId: number;
  list: ShoppingListInt;
}

const EditListHeader = ({ listId, list }: HeaderProps) => {
  const [listName, setListName] = useState(list.name);
  const modal = useContext(ModalContext);
  const queryClient = useQueryClient();

  const listNameMutation = useMutation({
    mutationFn: () => editListName(listId, list, listName),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (listName !== list.name) listNameMutation.mutate();
    modal.toggleModal(false);
  };

  return (
    <div style={{ border: "1px dashed blue", padding: "1rem" }}>
      <div>
        <h2>{list.name}</h2>
        <button onClick={() => modal.toggleModal(true)}>Edit</button>
      </div>

      {modal.active && (
        <div>
          <form onSubmit={submitHandler}>
            <label htmlFor="edit-list-name">
              <input
                type="text"
                name="edit-list-name"
                autoFocus={true}
                value={listName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setListName(e.currentTarget.value)
                }
              />
            </label>
            <button type="submit">Submit</button>
            <button onClick={() => modal.toggleModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditListHeader;
