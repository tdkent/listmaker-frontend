import { useMemo, useContext } from "react";

import ModalContext from "../../context/ModalContext";
import { ModalContentIdEnum } from "../../context/ModalContext";
import { TodoListItemInt, SubtaskInt } from "../../models/todo";
import {
  createRelativeDate,
  checkDueDate,
  createLocalDate,
  createTimeDue,
} from "../../utils/luxon-dates";
import TodoMap from "../edit-list/to-do/TodoMap";
import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";

interface TodoDetailsProps {
  item: TodoListItemInt;
  isLoaded: boolean;
  handleCancel: () => void;
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

const TodoDetailsModal = ({
  item,
  isLoaded,
  handleCancel,
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
}: TodoDetailsProps) => {
  const modal = useContext(ModalContext);
  const center = useMemo(() => item.itemCoords, [item.itemCoords]);
  return (
    <div>
      <div className="text-center">
        <h6 className="text-lg">{item.itemName}</h6>
        <p>{item.itemCategory}</p>
      </div>
      <div>
        {item.dateCompleted ? (
          <p>Completed: {createLocalDate(item.dateCompleted)}</p>
        ) : (
          <>
            <p>{`Due Date: ${createLocalDate(item.dateDue)} (${createRelativeDate(
              item.dateDue
            )})`}</p>
            <p>Due Time: {createTimeDue(item.timeDue)}</p>
          </>
        )}
      </div>
      {item.itemLocation && (
        <div>
          <p>Location</p>
          <p>Address: {item.itemLocation}</p>
          <div>
            {center && <div>{isLoaded ? <TodoMap center={center} /> : "Loading map..."}</div>}
          </div>
        </div>
      )}

      <div>
        <p>Subtasks</p>
        {item.itemTasks.length ? (
          <div>
            <ul>
              {item.itemTasks.map((task) => {
                return <li key={task.taskId}>{task.taskName}</li>;
              })}
            </ul>
          </div>
        ) : (
          <p>You have not created any subtasks for this item</p>
        )}
      </div>
      <div>
        <p>Repeat</p>
        <p>
          {item.isRecurring
            ? `This item is set to repeat on ${createLocalDate(item.dateRecurring)}`
            : "This item does not repeat"}
        </p>
      </div>
      <div>
        <Button
          type="button"
          text="Edit Item"
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
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
        <Button
          type="button"
          text="Close"
          handleClick={handleCancel}
          styles="w-full my-6 font-semibold"
        />
      </div>
    </div>
  );
};

export default TodoDetailsModal;
