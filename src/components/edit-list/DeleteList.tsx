import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Button from "../forms/Button";
import { deleteList } from "../../api/mutate-lists";

interface DeleteListProps {
  token: string;
  listId: number;
}

const DeleteList = ({ token, listId }: DeleteListProps) => {
  const { setFetchError } = useError();
  const modal = useContext(ModalContext);
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: () => deleteList(listId, token),
    onSuccess: () => navigate("/lists"),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleInit = () => {
    modal.provideId(ModalContentIdEnum.deleteList);
    modal.toggleModal(true);
  };

  const handleDelete = () => {
    mutate.mutate();
    modal.provideId("");
    modal.toggleModal(false);
  };

  const handleCancel = () => {
    modal.provideId("");
    modal.toggleModal(false);
  };

  const modalContent = (
    <div>
      <p>Are you sure want to delete this list?</p>
      <form>
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.deleteList && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed orange", padding: "1rem" }}>
        <div>
          <Button type="button" text="Delete List" handleClick={handleInit} />
        </div>
      </div>
    </>
  );
};

export default DeleteList;
