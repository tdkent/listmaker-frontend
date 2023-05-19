import Input from "../forms/Input";
import Button from "../forms/Button";
import { EditListInputsEnum } from "../../models/lists";
import { CustomStylesEnum } from "../../models/styles";
import { FormValidationInt } from "../../models/errors";

interface ModalProps {
  newName: string;
  formError: FormValidationInt | null;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const EditListModal = ({
  newName,
  formError,
  handleChange,
  handleSubmit,
  handleCancel,
}: ModalProps) => {
  return (
    <div className="mt-2">
      <div className="text-center">
        <span className="text-lg">Edit List</span>
      </div>
      <form>
        <Input
          label="Name"
          type="text"
          name={EditListInputsEnum.editName}
          id={EditListInputsEnum.editName}
          value={newName}
          required={false}
          handleChange={handleChange}
        />
        {formError && <span>{formError.message}</span>}
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
      </form>
    </div>
  );
};

export default EditListModal;
