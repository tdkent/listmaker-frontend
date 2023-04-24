import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import { EditItemFormInputsEnum, todoItemCats } from "../../models/item";

interface EditTodoItemModalProps {
  itemName: string;
  setItemName: (value: React.SetStateAction<string>) => void;
  itemCat: string;
  setItemCat: (value: React.SetStateAction<string>) => void;
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
}: EditTodoItemModalProps) => {
  return (
    <div>
      <form>
        <Input
          label="Edit item"
          type="text"
          name={EditItemFormInputsEnum.name}
          id={EditItemFormInputsEnum.name}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setItemName(e.currentTarget.value);
          }}
        />
        {/* <Input
          label="Category"
          type="text"
          name={EditItemFormInputsEnum.cat}
          id={EditItemFormInputsEnum.cat}
          value={itemCat}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => setItemCat(e.currentTarget.value)}
        /> */}
        <Select
          label="Category"
          name=""
          id=""
          defaultValue="Home"
          options={todoItemCats}
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) =>
            setItemCat(e.currentTarget.value)
          }
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );
};

export default EditTodoItemModal;
