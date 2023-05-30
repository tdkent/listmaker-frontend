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
      </div>
      <div className="lg:w-3/4 lg:mx-auto">
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
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-2`}
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

export default EditListModal;
