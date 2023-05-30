import Input from "../forms/Input";
import Button from "../forms/Button";
import Form from "../forms/Form";
import { CustomStylesEnum } from "../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";

interface EditShoppingItemModalProps {
  itemName: string;
  itemCat: string;
  isError: boolean;
  errorId: string;
  setIsError: (value: React.SetStateAction<boolean>) => void;
  setItemName: (value: React.SetStateAction<string>) => void;
  setItemCat: (value: React.SetStateAction<string>) => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}

const EditShoppingItemModal = ({
  itemName,
  setItemName,
  itemCat,
  setIsError,
  setItemCat,
  handleSave,
  handleDelete,
  handleCancel,
  isError,
  errorId,
}: EditShoppingItemModalProps) => {
  return (
    <div className="mt-2">
      <div className="text-center">
        <h6>Edit Item</h6>
      </div>
      <div className="lg:mx-auto lg:w-3/4">
        <Form id={FormIdsEnum.editShopItem}>
          <Input
            label="Name"
            type="text"
            id={InputIdsEnum.editShopName}
            value={itemName}
            required={true}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setIsError(false);
              setItemName(e.currentTarget.value);
            }}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameBlank}
          />
          <Input
            label="Category"
            type="text"
            id={InputIdsEnum.editShopCat}
            value={itemCat}
            required={true}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              setIsError(false);
              setItemCat(e.currentTarget.value);
            }}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameBlank}
          />
          <Button
            type="button"
            text="Save"
            handleClick={handleSave}
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-2`}
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
        </Form>
      </div>
    </div>
  );
};

export default EditShoppingItemModal;
