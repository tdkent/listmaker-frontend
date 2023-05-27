import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useLoadScript } from "@react-google-maps/api";

import ErrorContext from "../../../context/ErrorContext";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editTodoItem, removeTodoItem } from "../../../api/mutate-todo-items";
import { TodoListItemInt, SubtaskInt } from "../../../models/todo";
import TodoDetailsModal from "../../modal-content/TodoDetailsModal";
import EditTodoItemModal from "../../modal-content/EditTodoItemModal";
import EditSubtasksModal from "../../modal-content/EditSubtasksModal";
import DisplayTodoItem from "./DisplayTodoItem";
import { checkNameBlank } from "../../../utils/form-validation";
import { InputIdsEnum } from "../../../models/forms";
import Select from "../../forms/Select";
import { SortItemsEnum } from "../../../models/todo";
import { itemSortOptions, ListSortOptsInt } from "../../../utils/sort-options";

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
  const { toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // state
  const [selectedItem, setSelectedItem] = useState<TodoListItemInt | null>(null);
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [loc, setLoc] = useState<string | null>(null);
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
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeTodoItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  // handler functions
  const handleSave = () => {
    // form validation
    if (!checkNameBlank(name)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editTodoName);
    }
    if (!checkNameBlank(date)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editTodoDate);
    }
    // mutate
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
    setIsError(false);
  };

  // google maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,
    libraries,
  });

  // sort options
  const currSortOptions: ListSortOptsInt[] = JSON.parse(
    localStorage.getItem("todoSortPref") || "[]"
  );
  const sortOption = currSortOptions.find((obj) => obj.listId === listId)?.sort || null;
  const [sort, setSort] = useState(sortOption || "Date Added");
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setSort(e.currentTarget.value);
    localStorage.setItem(
      "todoSortPref",
      JSON.stringify([
        ...currSortOptions.filter((obj) => obj.listId !== listId),
        { listId, sort: e.currentTarget.value },
      ])
    );
  };
  const sortedList = itemSortOptions([...items], sort);

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
              setDate={setDate}
              setTime={setTime}
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
              name={name}
              cat={cat}
              date={date}
              loc={loc}
              time={time}
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
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              isLoaded={isLoaded}
              isError={isError}
              setIsError={setIsError}
              errorId={errorId}
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
        {items.length > 1 && (
          <div className="mt-4">
            <Select
              id={InputIdsEnum.myListsSort}
              label="Sort By:"
              required={false}
              defaultValue={sort}
              options={Object.values(SortItemsEnum)}
              handleSelect={handleSelect}
              flex={true}
            />
          </div>
        )}
        <div>
          <ul>
            {sortedList.map(
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
