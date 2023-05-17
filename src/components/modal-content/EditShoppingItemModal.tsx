import Input from "../forms/Input";
import Button from "../forms/Button";
import { EditItemFormInputsEnum } from "../../models/item";
import { CustomStylesEnum } from "../../models/styles";

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
      <div className="text-center">
        <span className="text-lg">Edit Shopping Item</span>
      </div>
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
        <Input
          label="Category"
          type="text"
          name={EditItemFormInputsEnum.cat}
          id={EditItemFormInputsEnum.cat}
          value={itemCat}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => setItemCat(e.currentTarget.value)}
        />
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
      </form>
    </div>
  );
};

export default EditShoppingItemModal;
