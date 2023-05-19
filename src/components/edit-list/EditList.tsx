import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import useError from "../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Button from "../forms/Button";
import { EditListInputsEnum } from "../../models/lists";
import { editList, deleteList } from "../../api/mutate-lists";
import { FormValidationInt } from "../../models/errors";
import Pencil from "../../icons/Pencil";
import Trash from "../../icons/Trash";
import EditListModal from "../modal-content/EditListModal";
import DeleteListModal from "../modal-content/DeleteListModal";

interface EditListProps {
  token: string;
  listId: number;
  listName: string;
}

const EditList = ({ token, listId, listName }: EditListProps) => {
  const { setFetchError } = useError();
  const [newName, setNewName] = useState(listName);
  const modal = useContext(ModalContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // errors
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // form submission
  const editMutation = useMutation({
    mutationFn: () => editList(listId, newName, token),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteList(listId, token),
    onSuccess: () => navigate("/lists"),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
    setFormError(null);
  };

  const handleEditInit = () => {
    modal.provideId(ModalContentIdEnum.editList);
    modal.toggleModal(true);
  };

  const handleDeleteInit = () => {
    modal.provideId(ModalContentIdEnum.deleteList);
    modal.toggleModal(true);
  };

  const handleSubmit = () => {
    // TODO: validate form
    if (!listName) {
      return setFormError({
        type: EditListInputsEnum.editName,
        message: "The name of your list cannot be blank!",
      });
    }
    if (listName !== newName) editMutation.mutate();
    modal.provideId("");
    modal.toggleModal(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    modal.provideId("");
    modal.toggleModal(false);
  };

  const handleCancel = () => {
    setNewName(newName);
    setFormError(null);
    modal.provideId("");
    modal.toggleModal(false);
  };

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editList && (
        <Modal
          modalContent={
            <EditListModal
              newName={newName}
              formError={formError}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          }
        />
      )}
      {modal.active && modal.contentId === ModalContentIdEnum.deleteList && (
        <Modal
          modalContent={<DeleteListModal handleDelete={handleDelete} handleCancel={handleCancel} />}
        />
      )}
      <div className="flex flex-row justify-between items-center">
        <h4>{listName}</h4>
        <div className="flex flex-row">
          <Button
            type="button"
            text={<Pencil styles="w-5 h-5 stroke-gray-600 mr-1 mt-1" />}
            handleClick={handleEditInit}
          />
          <Button type="button" text={<Trash />} handleClick={handleDeleteInit} />
        </div>
      </div>
    </>
  );
};

export default EditList;
