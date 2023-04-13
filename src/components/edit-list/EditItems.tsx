import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import { ShoppingListInt } from "../../models/lists";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editItem, checkItem, deleteItem } from "../../api/mutate-lists";
import { EditListInputsEnum, FetchSingleListInt } from "../../models/lists";
import { ShoppingListItemInt } from "../../models/item";
import updateAllItems from "../../utils/update-item";

interface EditItemsProps {
  token: string;
  id: number;
  type: string;
  items: FetchSingleListInt["items"];
}

const EditItems = ({ token, id, type, items }: EditItemsProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const [editItemId, setEditItemId] = useState<number>();
  const [itemName, setItemName] = useState<string>("");
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    // TODO: type the list types to limit to available list types only
    mutationFn: (itemId: number) => checkItem(id, type, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const editMutation = useMutation({
    mutationFn: (itemId: number) => editItem(id, itemId, itemName, type, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => deleteItem(id, type, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleSave = () => {
    editMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
  };
  const handleDelete = () => {
    deleteMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
  };
  const handleCancel = () => {
    setItemName("");
    modal.provideId("");
    modal.toggleModal(false);
  };

  const modalContent = (
    <div>
      <form>
        {/* // TODO: Add autofocus prop to Input component */}
        <Input
          label="Edit item"
          type="text"
          name={EditListInputsEnum.editItem}
          id={EditListInputsEnum.editItem}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setItemName(e.currentTarget.value);
          }}
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );

  // TODO: item display depends on list / item type
  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editItem && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                id={EditListInputsEnum.checkItem}
                name={EditListInputsEnum.checkItem}
                checked={item.isChecked}
                onChange={() => checkMutation.mutate(item.id)}
              />
              {item.name}
              <Button
                type="button"
                text="Edit"
                handleClick={() => {
                  setEditItemId(item.id);
                  setItemName(item.name);
                  modal.provideId(ModalContentIdEnum.editItem);
                  modal.toggleModal(true);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EditItems;
