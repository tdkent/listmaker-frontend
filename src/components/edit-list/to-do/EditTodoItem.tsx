import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editItem, deleteItem } from "../../../api/mutate-lists";
import { TodoListItemInt, CheckedItemEnum } from "../../../models/item";
import EditTodoItemModal from "../../modal-content/EditTodoItemModal";
import DisplayTodoItem from "./DisplayTodoItem";

interface EditTodoItemProps {
  token: string;
  id: number;
  type: string;
  items: TodoListItemInt[];
}

const EditTodoItem = ({ token, id, type, items }: EditTodoItemProps) => {
  // error handling
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();

  // state
  const [editItemId, setEditItemId] = useState<number>();
  const [itemChecked, setItemChecked] = useState<boolean>();
  const [itemName, setItemName] = useState<string>("");
  const [itemCat, setItemCat] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editShoppingItem = useMutation({
    mutationFn: ({ itemId, isChecked }: { itemId: number; isChecked: boolean }) =>
      editItem(id, itemId, isChecked, itemName, itemCat, type, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const deleteShoppingItem = useMutation({
    mutationFn: (itemId: number) => deleteItem(id, type, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  // handler functions
  const handleSave = () => {
    editShoppingItem.mutate({ itemId: editItemId as number, isChecked: itemChecked as boolean });
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleDelete = () => {
    deleteShoppingItem.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleCancel = () => {
    setItemName("");
    setItemCat("");
    modal.provideId("");
    modal.toggleModal(false);
  };

  // put all unique category names into sorted array
  // const categories = items
  //   .map((obj) => obj.category)
  //   .filter((val, idx, arr) => arr.indexOf(val) === idx)
  //   .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // console.log(categories);
  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editTodoItem && (
        <Modal
          modalContent={
            <EditTodoItemModal
              itemName={itemName}
              setItemName={setItemName}
              itemCat={itemCat}
              setItemCat={setItemCat}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            />
          }
        />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        {/* {categories.map(
          (cat) =>
            cat !== CheckedItemEnum.check && (
              <div key={categories.indexOf(cat)}>
                <h4>{cat}</h4> */}
        <div>
          <h4>Active</h4>
          <ul>
            {items.map((item) => (
              // item.category === cat &&
              // !item.isChecked && (
              <div key={item.id}>
                <DisplayTodoItem
                  token={token}
                  id={id}
                  type={type}
                  item={item}
                  setEditItemId={setEditItemId}
                  setItemChecked={setItemChecked}
                  setItemName={setItemName}
                  setItemCat={setItemCat}
                />
              </div>
            ))}
          </ul>
        </div>
        {/* )
        )} */}
        {/* {categories.includes(CheckedItemEnum.check) && ( */}
        <div>
          <h4>Finished</h4>
          <ul>
            {items.map(
              (item) =>
                item.isChecked && (
                  <div key={item.id}>
                    <DisplayTodoItem
                      token={token}
                      id={id}
                      type={type}
                      item={item}
                      setEditItemId={setEditItemId}
                      setItemChecked={setItemChecked}
                      setItemName={setItemName}
                      setItemCat={setItemCat}
                    />
                  </div>
                )
            )}
          </ul>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default EditTodoItem;
