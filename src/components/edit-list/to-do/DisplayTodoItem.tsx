import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import DisplayTodoSubtask from "./DisplayTodoSubtask";
import Button from "../../forms/Button";
import { EditItemFormInputsEnum } from "../../../models/item";
import { TodoListItemInt, SubtaskInt } from "../../../models/todo";
import { checkTodoItem } from "../../../api/mutate-todo-items";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import useError from "../../../hooks/useError";

interface DisplayTodoItemProps {
  token: string;
  listId: number;
  item: TodoListItemInt;
  setId: (value: React.SetStateAction<number | undefined>) => void;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setTime: (value: React.SetStateAction<string | null>) => void;
  setTasks: (value: React.SetStateAction<SubtaskInt[] | null>) => void;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  setRecurInteger: (value: React.SetStateAction<string>) => void;
  setRecurInterval: (value: React.SetStateAction<string>) => void;
}

const DisplayTodoItem = ({
  token,
  listId,
  item,
  setId,
  setName,
  setCat,
  setLoc,
  setDate,
  setTime,
  setTasks,
  setIsRecurring,
  setRecurInteger,
  setRecurInterval,
}: DisplayTodoItemProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    mutationFn: ({
      itemId,
      recurDate,
      recurVal,
    }: {
      itemId: number;
      recurDate: string;
      recurVal: string;
    }) => checkTodoItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  // TODO: function for due date display

  return (
    <li>
      <div>
        <input
          type="checkbox"
          id={EditItemFormInputsEnum.check}
          name={EditItemFormInputsEnum.check}
          checked={item.isChecked}
          onChange={() =>
            checkMutation.mutate({
              itemId: item.itemId,
              recurDate: item.dateRecurring,
              recurVal: item.recurVal,
            })
          }
        />
        {item.itemName} {item.itemCategory}
        <Button
          type="button"
          text="Edit"
          handleClick={() => {
            setId(item.itemId);
            setName(item.itemName);
            setCat(item.itemCategory);
            setLoc(item.itemLocation || "");
            setDate(item.dateDue);
            setTime(item.timeDue || null);
            setIsRecurring(item.isRecurring);
            setRecurInteger(!item.recurVal ? "" : item.recurVal.split(" ")[0]);
            setRecurInterval(!item.recurVal ? "" : item.recurVal.split(" ")[1]);
            modal.provideId(ModalContentIdEnum.editTodoItem);
            modal.toggleModal(true);
          }}
        />
        <Button
          type="button"
          text="Subtasks"
          handleClick={() => {
            setId(item.itemId);
            setTasks(item.itemTasks);
            modal.provideId(ModalContentIdEnum.editSubtasks);
            modal.toggleModal(true);
          }}
        />
      </div>
      <DisplayTodoSubtask tasks={item.itemTasks} listId={listId} token={token} />
    </li>
  );
};

export default DisplayTodoItem;
