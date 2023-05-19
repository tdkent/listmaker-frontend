import Form from "../forms/Form";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { EditItemFormInputsEnum } from "../../models/item";
import { todoItemCats, SubtaskInt } from "../../models/todo";
import TodoLocation from "../edit-list/to-do/TodoLocation";
import RepeatTodo from "./RepeatTodo";
import { CustomStylesEnum } from "../../models/styles";

interface EditTodoItemModalProps {
  listId: number;
  itemId: number;
  name: string;
  cat: string;
  date: string;
  loc: string | null;
  // coords: google.maps.LatLngLiteral | null;
  time: string | null;
  isRecurring: boolean;
  recurInteger: string;
  recurInterval: string;
  tasks: SubtaskInt[] | null;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string | null>) => void;
  // setCoords: (value: React.SetStateAction<google.maps.LatLngLiteral | null>) => void;
  setTime: (value: React.SetStateAction<string | null>) => void;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  setRecurInteger: (value: React.SetStateAction<string>) => void;
  setRecurInterval: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
  isLoaded: boolean;
}

const EditTodoItemModal = ({
  listId,
  itemId,
  name,
  cat,
  date,
  loc,
  time,
  isRecurring,
  recurInteger,
  recurInterval,
  tasks,
  setName,
  setCat,
  setDate,
  setLoc,
  setTime,
  setIsRecurring,
  setRecurInteger,
  setRecurInterval,
  handleSave,
  handleDelete,
  handleCancel,
  isLoaded,
}: EditTodoItemModalProps) => {
  return (
    <div className="mt-2 mb-6">
      <div className="text-center">
        <span className="text-lg">Edit Item</span>
      </div>
      <div>
        <Form id="todo-info-form">
          <Input
            label="Name"
            type="text"
            name={EditItemFormInputsEnum.name}
            id={EditItemFormInputsEnum.name}
            value={name}
            required={false}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setName(e.currentTarget.value);
            }}
          />
          <Select
            label="Category"
            name={EditItemFormInputsEnum.cat}
            id={EditItemFormInputsEnum.cat}
            defaultValue={cat}
            options={todoItemCats}
            required={false}
            handleSelect={(e: React.FormEvent<HTMLSelectElement>) => {
              setCat(e.currentTarget.value);
            }}
          />
          <Input
            label="Due Date"
            type="date"
            name={EditItemFormInputsEnum.date}
            id={EditItemFormInputsEnum.date}
            value={date}
            required={false}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setDate(e.currentTarget.value);
            }}
          />
          <Input
            label="Time"
            type="time"
            name={EditItemFormInputsEnum.time}
            id={EditItemFormInputsEnum.time}
            value={time || ""}
            required={false}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setTime(e.currentTarget.value + ":00");
            }}
          />
          <TodoLocation isLoaded={isLoaded} loc={loc} setLoc={setLoc} />
          <RepeatTodo
            isRecurring={isRecurring}
            setIsRecurring={setIsRecurring}
            recurInteger={recurInteger}
            setRecurInteger={setRecurInteger}
            recurInterval={recurInterval}
            setRecurInterval={setRecurInterval}
          />
        </Form>
      </div>
      {/* <TodoLocation isLoaded={isLoaded} loc={loc} setLoc={setLoc} /> */}
      {/* <RepeatTodo
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        recurInteger={recurInteger}
        setRecurInteger={setRecurInteger}
        recurInterval={recurInterval}
        setRecurInterval={setRecurInterval}
      /> */}
      <div>
        <Button
          type="button"
          text="Save"
          handleClick={handleSave}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
        <Button
          type="button"
          text="Delete"
          handleClick={handleDelete}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnWarning}`}
        />
        <Button
          type="button"
          text="Cancel"
          handleClick={handleCancel}
          styles="w-full my-6 font-semibold"
        />
      </div>
    </div>
  );
};

export default EditTodoItemModal;
