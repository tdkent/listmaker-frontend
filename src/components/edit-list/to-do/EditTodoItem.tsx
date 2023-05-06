import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editTodoItem, removeTodoItem } from "../../../api/mutate-todo-items";
import { TodoListItemInt, SubtaskInt } from "../../../models/todo";
import EditTodoItemModal from "../../modal-content/EditTodoItemModal";
import EditSubtasksModal from "../../modal-content/EditSubtasksModal";
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
  const [time, setTime] = useState<string | null>(null);
  const [tasks, setTasks] = useState<SubtaskInt[] | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recur, setRecur] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) =>
      editTodoItem(listId, itemId, name, cat, loc, date, time, isRecurring, recur, token),
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
              listId={listId}
              itemId={id as number}
              name={name}
              cat={cat}
              date={date}
              loc={loc}
              time={time}
              tasks={tasks}
              isRecurring={isRecurring}
              recur={recur}
              setName={setName}
              setCat={setCat}
              setDate={setDate}
              setLoc={setLoc}
              setTime={setTime}
              setIsRecurring={setIsRecurring}
              setRecur={setRecur}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            />
          }
        />
      )}
      {modal.active && modal.contentId === ModalContentIdEnum.editSubtasks && (
        <Modal
          modalContent={
            <EditSubtasksModal
              token={token}
              listId={listId}
              itemId={id as number}
              items={items}
              tasks={tasks as SubtaskInt[]}
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
                      item={item}
                      setId={setId}
                      setName={setName}
                      setCat={setCat}
                      setLoc={setLoc}
                      setDate={setDate}
                      setTime={setTime}
                      setTasks={setTasks}
                      setIsRecurring={setIsRecurring}
                      setRecur={setRecur}
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
                      item={item}
                      setId={setId}
                      setName={setName}
                      setCat={setCat}
                      setLoc={setLoc}
                      setDate={setDate}
                      setTime={setTime}
                      setTasks={setTasks}
                      setIsRecurring={setIsRecurring}
                      setRecur={setRecur}
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