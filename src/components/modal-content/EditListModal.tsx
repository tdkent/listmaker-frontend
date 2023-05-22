import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";

interface ModalProps {
  newName: string;
  isError: boolean;
  errorId: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const EditListModal = ({
  newName,
  isError,
  errorId,
  handleChange,
  handleSubmit,
  handleCancel,
}: ModalProps) => {
  return (
    <div className="mt-2">
      <div className="text-center">
        <h6>Edit List</h6>
        <p className="my-4 text-left">Make sure list name is 1-24 characters long.</p>
      </div>
      <Form id={FormIdsEnum.editList}>
        <Input
          label="Name"
          type="text"
          id={InputIdsEnum.editListName}
          value={newName}
          required={true}
          handleChange={handleChange}
          isError={isError}
          errorId={errorId}
          errorString={FormErrorsEnum.nameLength}
        />
        <Button
          type="button"
          text="Save"
          handleClick={handleSubmit}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
        <Button
          type="button"
          text="Cancel"
          handleClick={handleCancel}
          styles={CustomStylesEnum.btnCancel}
        />
      </Form>
    </div>
  );
};

export default EditListModal;
