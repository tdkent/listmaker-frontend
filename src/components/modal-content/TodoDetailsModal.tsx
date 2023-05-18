import { useMemo, useContext } from "react";

import ModalContext from "../../context/ModalContext";
import { ModalContentIdEnum } from "../../context/ModalContext";
import { TodoListItemInt, SubtaskInt } from "../../models/todo";
import { createRelativeDate, createLocalDate, createTimeDue } from "../../utils/luxon-dates";
import TodoMap from "../edit-list/to-do/TodoMap";
import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";
import Calendar from "../../icons/Calendar";
import Pin from "../../icons/Pin";
import Repeat from "../../icons/Repeat";

interface TodoDetailsProps {
  item: TodoListItemInt;
  isLoaded: boolean;
  handleCancel: () => void;
  setId: (value: React.SetStateAction<number | undefined>) => void;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string | null>) => void;
  // setCoords: (value: React.SetStateAction<google.maps.LatLngLiteral | null>) => void;
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
  // setCoords,
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
    <div className="text-sm">
      <div className="flex flex-row justify-between items-center text-center mt-1 px-3">
        <div>
          <Button type="button" text="Close" handleClick={handleCancel} />
        </div>
        <div>
          <p className="font-medium">Item Details</p>
        </div>
        <div>
          <Button
            type="button"
            text="Edit"
            handleClick={() => {
              setId(item.itemId);
              setName(item.itemName);
              setCat(item.itemCategory);
              setLoc(item.itemLocation);
              // setCoords(item.itemCoords);
              setDate(item.dateDue);
              setTime(item.timeDue || null);
              setIsRecurring(item.isRecurring);
              setRecurInteger(!item.recurVal ? "" : item.recurVal.split(" ")[0]);
              setRecurInterval(!item.recurVal ? "" : item.recurVal.split(" ")[1]);
              modal.provideId(ModalContentIdEnum.editTodoItem);
              modal.toggleModal(true);
            }}
            styles="rounded px-3 py-1 bg-azure text-white"
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <h6>{item.itemName}</h6>
        <p>{item.itemCategory}</p>
      </div>
      <div className="mt-4 pt-3 pb-1 px-2 border-t">
        <Calendar styles="w-5 h-5 mx-auto text-gray-600 mb-2" />
        {item.dateCompleted ? (
          <p>Completed: {createLocalDate(item.dateCompleted)}</p>
        ) : (
          <>
            <p>{`Due Date: ${createLocalDate(item.dateDue)} (${createRelativeDate(
              item.dateDue
            )})`}</p>
            <p className="mt-2">Due Time: {createTimeDue(item.timeDue)}</p>
          </>
        )}
      </div>
      <div className="mt-4 pt-3 pb-1 px-2 border-t">
        <Pin styles="w-5 h-5 mx-auto text-gray-600 mb-2" />
        {item.itemLocation ? (
          <>
            <p>{item.itemLocation}</p>
            {center && <>{isLoaded ? <TodoMap center={center} /> : <p>Loading map...</p>}</>}
          </>
        ) : (
          <p>This item does not have a location</p>
        )}
      </div>
      <div className="mt-4 pt-3 pb-1 px-2 border-t">
        <Repeat styles="w-5 h-5 mx-auto text-gray-600 mb-2" />
        <p>
          {item.isRecurring
            ? `This item is set to repeat on ${createLocalDate(item.dateRecurring)}`
            : "This item does not repeat"}
        </p>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default TodoDetailsModal;
