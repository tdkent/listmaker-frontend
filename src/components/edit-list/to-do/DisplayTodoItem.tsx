import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DateTime } from "luxon";

import DisplayTodoSubtask from "./DisplayTodoSubtask";
import Button from "../../forms/Button";
import Checkbox from "../../forms/Checkbox";
import { TodoListItemInt, SubtaskInt, ToDoCats } from "../../../models/todo";
import { checkTodoItem } from "../../../api/mutate-todo-items";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import useError from "../../../hooks/useError";
import Pencil from "../../../icons/Pencil";
import Queue from "../../../icons/Queue";
import Calendar from "../../../icons/Calendar";
import Check from "../../../icons/Check";
import { createRelativeDate, checkDueDate, createCompletedDate } from "../../../utils/luxon-dates";

interface DisplayTodoItemProps {
  token: string;
  listId: number;
  item: TodoListItemInt;
  setId: (value: React.SetStateAction<number | undefined>) => void;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string | null>) => void;
  setCoords: (value: React.SetStateAction<google.maps.LatLngLiteral | null>) => void;
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
  setCoords,
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

  const dueDate = createRelativeDate(item.dateDue);
  const checkDate = checkDueDate(item.dateDue);
  const completedDate = createCompletedDate(item.dateCompleted);

  return (
    <>
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row items-center">
          <Checkbox
            checked={item.isChecked}
            onChange={() =>
              checkMutation.mutate({
                itemId: item.itemId,
                recurDate: item.dateRecurring,
                recurVal: item.recurVal,
              })
            }
          />
          <div className={"ml-1"}>
            <span className={`${item.isChecked && "line-through"}`}>{item.itemName}</span>
            <div className="flex flex-row text-xs">
              <span className="mr-4">
                {item.itemCategory === ToDoCats.appoint ? "Appt" : item.itemCategory}
              </span>
              <span
                className={`flex flex-row items-center ${
                  !completedDate && !checkDate && "text-red-700"
                }`}>
                {completedDate ? (
                  <>
                    <Check />
                    {completedDate}
                  </>
                ) : (
                  <>
                    <Calendar />
                    {dueDate}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <Button
            type="button"
            text={<Pencil />}
            handleClick={() => {
              setId(item.itemId);
              setName(item.itemName);
              setCat(item.itemCategory);
              setLoc(item.itemLocation);
              setCoords(item.itemCoords);
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
            text={<Queue />}
            handleClick={() => {
              setId(item.itemId);
              setTasks(item.itemTasks);
              modal.provideId(ModalContentIdEnum.editSubtasks);
              modal.toggleModal(true);
            }}
          />
        </div>
      </div>
      {item.itemTasks.length ? (
        <div className="mb-3">
          <DisplayTodoSubtask tasks={item.itemTasks} listId={listId} token={token} />
        </div>
      ) : null}
    </>
  );
};

export default DisplayTodoItem;
