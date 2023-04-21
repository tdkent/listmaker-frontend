import Input from "../forms/Input";
import Button from "../forms/Button";
import { EditItemFormInputsEnum } from "../../models/item";

interface EditShoppingItemModalProps {
  itemName: string;
  setItemName: (value: React.SetStateAction<string>) => void;
  itemCat: string;
  setItemCat: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}

const EditShoppingItemModal = ({
  itemName,
  setItemName,
  itemCat,
  setItemCat,
  handleSave,
  handleDelete,
  handleCancel,
}: EditShoppingItemModalProps) => {
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
        <Input
          label="Category"
          type="text"
          name={EditItemFormInputsEnum.cat}
          id={EditItemFormInputsEnum.cat}
          value={itemCat}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => setItemCat(e.currentTarget.value)}
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );
};

export default EditShoppingItemModal;
