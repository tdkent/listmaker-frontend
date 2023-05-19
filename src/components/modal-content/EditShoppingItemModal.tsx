import Input from "../forms/Input";
import Button from "../forms/Button";
import Form from "../forms/Form";
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
    <div className="mt-2">
      <div className="text-center">
        <span className="text-lg">Edit Item</span>
      </div>
      <Form id="edit-shopping-item-form">
        <Input
          label="Name"
          type="text"
          name={EditItemFormInputsEnum.name}
          id={EditItemFormInputsEnum.name}
          value={itemName}
          required={false}
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
          required={false}
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
      </Form>
    </div>
  );
};

export default EditShoppingItemModal;
