import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";

interface ModalProps {
  handleDelete: () => void;
  handleCancel: () => void;
}

const DeleteListModal = ({ handleDelete, handleCancel }: ModalProps) => {
  return (
    <div className="mt-2">
      <div className="text-center">
        <h6>Delete List</h6>
        <p className="text-center my-4">Are you sure you want to delete this list?</p>
      </div>
      <div className="lg:mx-auto lg:w-3/4">
        <Button
          type="button"
          text="Delete"
          handleClick={handleDelete}
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnWarning} mt-2`}
        />
        <Button
          type="button"
          text="Cancel"
          handleClick={handleCancel}
          styles={CustomStylesEnum.btnCancel}
        />
      </div>
    </div>
  );
};

export default DeleteListModal;
