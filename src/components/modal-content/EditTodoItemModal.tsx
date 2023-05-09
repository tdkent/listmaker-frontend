import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { EditItemFormInputsEnum } from "../../models/item";
import { ToDoCats, todoItemCats, SubtaskInt } from "../../models/todo";
import RepeatTodo from "./RepeatTodo";

interface EditTodoItemModalProps {
  listId: number;
  itemId: number;
  name: string;
  cat: string;
  date: string;
  loc: string;
  time: string | null;
  isRecurring: boolean;
  recurInteger: string;
  recurInterval: string;
  tasks: SubtaskInt[] | null;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string>) => void;
  setTime: (value: React.SetStateAction<string | null>) => void;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  setRecurInteger: (value: React.SetStateAction<string>) => void;
  setRecurInterval: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
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
}: EditTodoItemModalProps) => {
  return (
    <div>
      <form>
        <Input
          label="Name"
          type="text"
          name={EditItemFormInputsEnum.name}
          id={EditItemFormInputsEnum.name}
          value={name}
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
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setDate(e.currentTarget.value);
          }}
        />
        {(cat === ToDoCats.appoint || cat === ToDoCats.work) && (
          <Input
            label="Time"
            type="time"
            name={EditItemFormInputsEnum.time}
            id={EditItemFormInputsEnum.time}
            value={time || ""}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setTime(e.currentTarget.value + ":00");
            }}
          />
        )}
        {(cat === ToDoCats.appoint || cat === ToDoCats.errand) && (
          <Input
            label="Location"
            type="text"
            name={EditItemFormInputsEnum.time}
            id={EditItemFormInputsEnum.time}
            value={loc}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => setLoc(e.currentTarget.value)}
          />
        )}
        <RepeatTodo
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
          recurInteger={recurInteger}
          setRecurInteger={setRecurInteger}
          recurInterval={recurInterval}
          setRecurInterval={setRecurInterval}
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Remove" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );
};

export default EditTodoItemModal;
