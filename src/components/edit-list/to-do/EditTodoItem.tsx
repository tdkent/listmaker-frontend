import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useLoadScript } from "@react-google-maps/api";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editTodoItem, removeTodoItem } from "../../../api/mutate-todo-items";
import { TodoListItemInt, SubtaskInt } from "../../../models/todo";
import TodoDetailsModal from "../../modal-content/TodoDetailsModal";
import EditTodoItemModal from "../../modal-content/EditTodoItemModal";
import EditSubtasksModal from "../../modal-content/EditSubtasksModal";
import DisplayTodoItem from "./DisplayTodoItem";

interface EditTodoItemProps {
  token: string;
  listId: number;
  listType: string;
  items: TodoListItemInt[];
}

const libraries: ["places"] = ["places"];

const EditTodoItem = ({ token, listId, listType, items }: EditTodoItemProps) => {
  // error handling
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();

  // state
  const [selectedItem, setSelectedItem] = useState<TodoListItemInt | null>(null);
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [loc, setLoc] = useState<string | null>(null);
  // const [coords, setCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string | null>(null);
  const [tasks, setTasks] = useState<SubtaskInt[] | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurInteger, setRecurInteger] = useState<string>("");
  const [recurInterval, setRecurInterval] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) =>
      editTodoItem(
        listId,
        itemId,
        name,
        cat,
        loc,
        date,
        time,
        isRecurring,
        recurInteger,
        recurInterval,
        token
      ),
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

  // google maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,
    libraries,
  });

  // completed items

  const completedItems = items.filter((item) => item.isChecked);

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.displayTodoItem && (
        <Modal
          modalContent={
            <TodoDetailsModal
              item={selectedItem!}
              isLoaded={isLoaded}
              handleCancel={handleCancel}
              setId={setId}
              setName={setName}
              setCat={setCat}
              setLoc={setLoc}
              // setCoords={setCoords}
              setDate={setDate}
              setTime={setTime}
              setTasks={setTasks}
              setIsRecurring={setIsRecurring}
              setRecurInteger={setRecurInteger}
              setRecurInterval={setRecurInterval}
            />
          }
        />
      )}
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
              // coords={coords}
              time={time}
              tasks={tasks}
              isRecurring={isRecurring}
              recurInteger={recurInteger}
              recurInterval={recurInterval}
              setName={setName}
              setCat={setCat}
              setDate={setDate}
              setLoc={setLoc}
              setTime={setTime}
              setIsRecurring={setIsRecurring}
              setRecurInteger={setRecurInteger}
              setRecurInterval={setRecurInterval}
              // setCoords={setCoords}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              isLoaded={isLoaded}
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
      <section>
        <div>
          <ul>
            {items.map(
              (item) =>
                !item.isChecked && (
                  <li key={item.itemId} className="border-b">
                    <DisplayTodoItem
                      token={token}
                      listId={listId}
                      item={item}
                      setId={setId}
                      setName={setName}
                      setCat={setCat}
                      setLoc={setLoc}
                      // setCoords={setCoords}
                      setDate={setDate}
                      setTime={setTime}
                      setTasks={setTasks}
                      setIsRecurring={setIsRecurring}
                      setRecurInteger={setRecurInteger}
                      setRecurInterval={setRecurInterval}
                      setSelectedItem={setSelectedItem}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
        {completedItems.length ? (
          <div className="mt-4">
            <h4 className="mt-6 mb-2">Completed Items</h4>
            <ul>
              {completedItems.map((item) => (
                <li key={item.itemId} className="text-gray-600 border-b">
                  <DisplayTodoItem
                    token={token}
                    listId={listId}
                    item={item}
                    setId={setId}
                    setName={setName}
                    setCat={setCat}
                    setLoc={setLoc}
                    // setCoords={setCoords}
                    setDate={setDate}
                    setTime={setTime}
                    setTasks={setTasks}
                    setIsRecurring={setIsRecurring}
                    setRecurInteger={setRecurInteger}
                    setRecurInterval={setRecurInterval}
                    setSelectedItem={setSelectedItem}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default EditTodoItem;
