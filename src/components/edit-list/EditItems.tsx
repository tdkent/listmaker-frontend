import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import { ShoppingListInt } from "../../models/lists";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editItem } from "../../api/mutate-lists";
import { EditListInputsEnum, FetchSingleListInt } from "../../models/lists";
import { ShoppingListItemInt } from "../../models/item";
import updateAllItems from "../../utils/update-item";

interface EditItemsProps {
  token: string;
  id: number;
  items: FetchSingleListInt["items"];
}

const EditItems = ({ token, id, items }: EditItemsProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  // Note: listItem object depends on list / item type
  const [listItem, setListItem] = useState<ShoppingListItemInt>();
  const [itemName, setItemName] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: ShoppingListInt) => editItem(token, body),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleSave = () => {
    // const updateItem = { ...(listItem as ShoppingListItemInt), name: itemName };
    // const body = updateAllItems(updateItem, list);
    // mutation.mutate(body);
    // modal.provideId("");
    // modal.toggleModal(false);
    // setItemName("");
  };
  const handleDelete = () => {
    // const deleteItem = list.items
    //   .filter((item) => item.id !== listItem!.id)
    //   .sort((a, b) => a.id - b.id);
    // const body = { ...list, items: deleteItem };
    // mutation.mutate(body);
    // modal.provideId("");
    // modal.toggleModal(false);
    // setItemName("");
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
                onChange={() => {
                  const checkItem = { ...item, isChecked: !item.isChecked };
                  console.log("checkItem: ", checkItem);
                  // const body = updateAllItems(checkItem, list);
                  // mutation.mutate(body);
                }}
              />
              {item.name}
              <Button
                type="button"
                text="Edit"
                handleClick={() => {
                  setListItem(item);
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
