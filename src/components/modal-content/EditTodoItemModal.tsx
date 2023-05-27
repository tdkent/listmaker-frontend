import Form from "../forms/Form";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { todoItemCats } from "../../models/todo";
import TodoLocation from "../edit-list/to-do/TodoLocation";
import RepeatTodo from "./RepeatTodo";
import { CustomStylesEnum } from "../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";

interface EditTodoItemModalProps {
  name: string;
  cat: string;
  date: string;
  loc: string | null;
  time: string | null;
  isRecurring: boolean;
  recurInteger: string;
  recurInterval: string;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string | null>) => void;
  setTime: (value: React.SetStateAction<string | null>) => void;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  setRecurInteger: (value: React.SetStateAction<string>) => void;
  setRecurInterval: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
  isLoaded: boolean;
  isError: boolean;
  setIsError: (value: React.SetStateAction<boolean>) => void;
  errorId: string;
}

const EditTodoItemModal = ({
  name,
  cat,
  date,
  loc,
  time,
  isRecurring,
  recurInteger,
  recurInterval,
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
  isError,
  setIsError,
  errorId,
}: EditTodoItemModalProps) => {
  return (
    <div className="mt-2 mb-6">
      <div className="text-center">
        <h6>Edit Item</h6>
      </div>
      <div>
        <Form id={FormIdsEnum.editTodoItem}>
          <Input
            label="Name"
            type="text"
            id={InputIdsEnum.editTodoName}
            value={name}
            required={true}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setIsError(false);
              setName(e.currentTarget.value);
            }}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameBlank}
          />
          <Select
            label="Category"
            id={InputIdsEnum.editTodoCat}
            defaultValue={cat}
            options={todoItemCats}
            required={true}
            handleSelect={(e: React.FormEvent<HTMLSelectElement>) => {
              setCat(e.currentTarget.value);
            }}
          />
          <Input
            label="Due Date"
            type="date"
            id={InputIdsEnum.editTodoDate}
            value={date}
            required={true}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setIsError(false);
              setDate(e.currentTarget.value);
            }}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.dateBlank}
          />
          <Input
            label="Time"
            type="time"
            id={InputIdsEnum.editTodoTime}
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
      <div className="">
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
          styles={CustomStylesEnum.btnCancel}
        />
      </div>
    </div>
  );
};

export default EditTodoItemModal;
