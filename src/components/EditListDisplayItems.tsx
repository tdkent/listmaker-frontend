import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState, useReducer } from "react";
import { AxiosError } from "axios";

import { EditListPropsInt, ShoppingListInt, ShoppingListItemInt } from "../models/lists";
import ModalContext, { ModalContentIdEnum } from "../context/ModalContext";
import Modal from "./Modal";
import Input from "./forms/Input";
import Button from "./forms/Button";
import { selectCheckbox, editItemName, deleteItem, editItem } from "../api/mutate-lists";
import { EditListInputsEnum } from "../models/lists";
import { ReducerActionInt } from "../models/reducers";
import updateAllItems from "../utils/update-item";

const EditListDisplayItems = ({ token, list }: EditListPropsInt) => {
  const modal = useContext(ModalContext);

  // errors
  // TODO: add useError hook to mutations

  // reducer
  const defaultState = list;

  const reducer = (state: ShoppingListInt, action: ReducerActionInt) => {
    throw new Error(`No matching "${action.type}" action type`);
  };

  const [itemId, setItemId] = useState<number>(0);
  const [itemName, setItemName] = useState<string>("");
  const queryClient = useQueryClient();
  // const mutateCheckbox = useMutation({
  //   mutationFn: (itemId: number) => selectCheckbox(itemId, list.id, list),
  //   onSuccess: () => queryClient.invalidateQueries(["list", list.id]),
  // });
  const mutation = useMutation({
    mutationFn: (body: ShoppingListInt) => editItem(token, body),
    onSuccess: () => queryClient.invalidateQueries(["list", list.id]),
    onError: (error: AxiosError) => console.log(error),
  });
  const mutateItemName = useMutation({
    mutationFn: () => editItemName(list, itemId, itemName),
    onSuccess: () => queryClient.invalidateQueries(["list", list.id]),
  });
  const mutateDeleteItem = useMutation({
    mutationFn: () => deleteItem(list, itemId),
    onSuccess: () => queryClient.invalidateQueries(["list", list.id]),
  });

  const handleSave = () => {
    mutateItemName.mutate();
    modal.provideId("");
    modal.toggleModal(false);
    setItemId(0);
    setItemName("");
  };
  const handleDelete = () => {
    mutateDeleteItem.mutate();
    modal.provideId("");
    modal.toggleModal(false);
    setItemId(0);
    setItemName("");
  };
  const handleCancel = () => {
    setItemId(0);
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
          handleChange={(e: React.FormEvent<HTMLInputElement>) =>
            setItemName(e.currentTarget.value)
          }
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
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
                id={EditListInputsEnum.checkItem}
                name={EditListInputsEnum.checkItem}
                checked={item.isDone}
                onChange={() => {
                  const checkItem = { ...item, isDone: !item.isDone };
                  const body = updateAllItems(checkItem, list);
                  mutation.mutate(body);
                }}
              />
              {item.name}
              <Button
                type="button"
                text="Edit"
                handleClick={() => {
                  setItemId(item.id);
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

export default EditListDisplayItems;
