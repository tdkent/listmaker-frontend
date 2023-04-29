import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editTodoItem, removeTodoItem } from "../../../api/mutate-todo-items";
import { TodoListItemInt } from "../../../models/item";
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
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) => editTodoItem(listId, itemId, name, cat, date, token),
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
    editMutation.mutate(id as number);
    modal.provideId("");
    modal.toggleModal(false);
  };
  const handleDelete = () => {
    removeMutation.mutate(id as number);
    modal.provideId("");
    modal.toggleModal(false);
  };
  const handleCancel = () => {
    modal.provideId("");
    modal.toggleModal(false);
  };

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editTodoItem && (
        <Modal
          modalContent={
            <EditTodoItemModal
              name={name}
              cat={cat}
              date={date}
              loc={loc}
              setName={setName}
              setCat={setCat}
              setDate={setDate}
              setLoc={setLoc}
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
                      setId={setId}
                      setName={setName}
                      setCat={setCat}
                      setDate={setDate}
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
                      setId={setId}
                      setName={setName}
                      setCat={setCat}
                      setDate={setDate}
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
