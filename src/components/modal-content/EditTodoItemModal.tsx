import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { EditItemFormInputsEnum, ToDoCats, todoItemCats } from "../../models/item";

interface EditTodoItemModalProps {
  itemName: string;
  setItemName: (value: React.SetStateAction<string>) => void;
  itemCat: string;
  setItemCat: (value: React.SetStateAction<string>) => void;
  itemDate: string;
  setItemDate: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}

const EditTodoItemModal = ({
  itemName,
  setItemName,
  itemCat,
  setItemCat,
  handleSave,
  handleDelete,
  handleCancel,
  itemDate,
  setItemDate,
}: EditTodoItemModalProps) => {
  return (
    <div>
      <form>
        <Input
          label="Name"
          type="text"
          name={EditItemFormInputsEnum.name}
          id={EditItemFormInputsEnum.name}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setItemName(e.currentTarget.value);
          }}
        />
        <Select
          label="Category"
          name={EditItemFormInputsEnum.cat}
          id={EditItemFormInputsEnum.cat}
          defaultValue={itemCat}
          options={todoItemCats}
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) =>
            setItemCat(e.currentTarget.value)
          }
        />
        <Input
          label="Due"
          type="date"
          name={EditItemFormInputsEnum.date}
          id={EditItemFormInputsEnum.date}
          value={itemDate}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setItemDate(e.currentTarget.value);
          }}
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Remove" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );
};

export default EditTodoItemModal;
