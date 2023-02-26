import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { ShoppingListInt } from "../models/lists";
import ModalContext, { ModalContentIdEnum } from "../context/ModalContext";
import Modal from "./Modal";
import { selectCheckbox, editItemName, deleteItem } from "../api/mutate-lists";

interface DisplayItemsProps {
  listId: number;
  list: ShoppingListInt;
}

const EditListDisplayItems = ({ listId, list }: DisplayItemsProps) => {
  const modal = useContext(ModalContext);
  const [itemId, setItemId] = useState<number>(0);
  const [itemName, setItemName] = useState<string>("");
  const queryClient = useQueryClient();
  const mutateCheckbox = useMutation({
    mutationFn: (itemId: number) => selectCheckbox(itemId, listId, list),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });
  const mutateItemName = useMutation({
    mutationFn: () => editItemName(list, itemId, itemName),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });
  const mutateDeleteItem = useMutation({
    mutationFn: () => deleteItem(list, itemId),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });
  const modalContent = (
    <div>
      <header>
        <h3>Edit {list.name} item</h3>
        <form>
          <input
            type="text"
            autoFocus={true}
            value={itemName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setItemName(e.currentTarget.value)}
          />
          <button
            type="button"
            onClick={() => {
              mutateItemName.mutate();
              modal.provideId("");
              modal.toggleModal(false);
              setItemId(0);
              setItemName("");
            }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              mutateDeleteItem.mutate();
              modal.provideId("");
              modal.toggleModal(false);
              setItemId(0);
              setItemName("");
            }}>
            Delete Item
          </button>
          <button
            type="button"
            onClick={() => {
              setItemId(0);
              setItemName("");
              modal.provideId("");
              modal.toggleModal(false);
            }}>
            Cancel
          </button>
        </form>
      </header>
    </div>
  );

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editItem && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        <ul>
          {list.items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => mutateCheckbox.mutate(item.id)}
              />
              {item.name}
              <button
                onClick={() => {
                  setItemId(item.id);
                  setItemName(item.name);
                  modal.provideId(ModalContentIdEnum.editItem);
                  modal.toggleModal(true);
                }}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EditListDisplayItems;
