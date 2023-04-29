import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { EditItemFormInputsEnum, ToDoCats, todoItemCats } from "../../models/item";

interface EditTodoItemModalProps {
  name: string;
  cat: string;
  date: string;
  loc: string;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}

const EditTodoItemModal = ({
  name,
  cat,
  date,
  loc,
  setName,
  setCat,
  setDate,
  setLoc,
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
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) => setCat(e.currentTarget.value)}
        />
        <Input
          label="Due"
          type="date"
          name={EditItemFormInputsEnum.date}
          id={EditItemFormInputsEnum.date}
          value={date}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setDate(e.currentTarget.value);
          }}
        />
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
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Remove" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );
};

export default EditTodoItemModal;
