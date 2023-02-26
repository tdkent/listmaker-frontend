import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ModalContext, { ModalContentIdEnum } from "../context/ModalContext";
import Modal from "./Modal";
import { ShoppingListInt } from "../models/lists";
import { editListName } from "../api/mutate-lists";

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
    onSuccess: () => {
      queryClient.invalidateQueries(["list", listId]);
    },
  });

  const modalContent = (
    <div>
      <form>
        <input
          type="text"
          autoFocus={true}
          value={listName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setListName(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (listName !== list.name) listNameMutation.mutate();
            modal.provideId("");
            modal.toggleModal(false);
          }}>
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            modal.provideId("");
            modal.toggleModal(false);
          }}>
          Cancel
        </button>
      </form>
    </div>
  );

  return (
    <div style={{ border: "1px dashed blue", padding: "1rem" }}>
      <div>
        <h2>{list.name}</h2>
        <button
          onClick={() => {
            modal.provideId(ModalContentIdEnum.editList);
            modal.toggleModal(true);
          }}>
          Edit
        </button>
      </div>

      {modal.active && modal.contentId === ModalContentIdEnum.editList && (
        <Modal modalContent={modalContent} />
      )}
    </div>
  );
};

export default EditListHeader;
