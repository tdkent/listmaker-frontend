import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editTodoItem, removeTodoItem } from "../../../api/mutate-todo-items";
import { TodoListItemInt, ToDoCats } from "../../../models/item";
import EditTodoItemModal from "../../modal-content/EditTodoItemModal";
import DisplayTodoItem from "./DisplayTodoItem";

interface EditTodoItemProps {
  token: string;
  listId: number;
  listType: string;
  items: TodoListItemInt[];
}

const EditTodoItem = ({ token, listId, listType, items }: EditTodoItemProps) => {
  // error handling
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();

  // state
  const [editItemId, setEditItemId] = useState<number>();
  const [itemChecked, setItemChecked] = useState<boolean>();
  const [itemName, setItemName] = useState<string>("");
  const [itemCat, setItemCat] = useState<string>("");
  const [itemDate, setItemDate] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) =>
      editTodoItem(listId, itemId, itemName, itemCat, itemDate, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeTodoItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  // handler functions
  const handleSave = () => {
    editMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    // setItemName("");
  };
  const handleDelete = () => {
    removeMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    // setItemName("");
  };
  const handleCancel = () => {
    // setItemName("");
    modal.provideId("");
    modal.toggleModal(false);
  };

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
              itemDate={itemDate}
              setItemDate={setItemDate}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            />
          }
        />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        <div>
          <ul>
            {items.map(
              (item) =>
                !item.isChecked && (
                  <div key={item.itemId}>
                    <DisplayTodoItem
                      token={token}
                      listId={listId}
                      listType={listType}
                      item={item}
                      setEditItemId={setEditItemId}
                      setItemChecked={setItemChecked}
                      setItemName={setItemName}
                      setItemCat={setItemCat}
                      setItemDate={setItemDate}
                    />
                  </div>
                )
            )}
          </ul>
        </div>
        <div>
          <h4>Completed Todos</h4>
          <ul>
            {items.map(
              (item) =>
                item.isChecked && (
                  <div key={item.itemId}>
                    <DisplayTodoItem
                      token={token}
                      listId={listId}
                      listType={listType}
                      item={item}
                      setEditItemId={setEditItemId}
                      setItemChecked={setItemChecked}
                      setItemName={setItemName}
                      setItemCat={setItemCat}
                      setItemDate={setItemDate}
                    />
                  </div>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EditTodoItem;
