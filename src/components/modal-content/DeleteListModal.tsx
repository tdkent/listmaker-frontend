import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";

interface ModalProps {
  handleDelete: () => void;
  handleCancel: () => void;
}

const DeleteListModal = ({ handleDelete, handleCancel }: ModalProps) => {
  return (
    <div>
      <div className="text-center">
        <h6>Delete List</h6>
        <p className="text-center my-4">Are you sure you want to delete this list?</p>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default DeleteListModal;
