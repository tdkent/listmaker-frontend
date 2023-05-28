import { useState, useContext, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import ErrorContext from "../../context/ErrorContext";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Button from "../forms/Button";
import { InputIdsEnum } from "../../models/forms";
import { editList, deleteList } from "../../api/mutate-lists";
import Pencil from "../../icons/Pencil";
import Trash from "../../icons/Trash";
import EditListModal from "../modal-content/EditListModal";
import DeleteListModal from "../modal-content/DeleteListModal";
import { checkNameLength } from "../../utils/form-validation";

interface EditListProps {
  token: string;
  listId: number;
  listName: string;
}

const EditList = ({ token, listId, listName }: EditListProps) => {
  const modal = useContext(ModalContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // form submission
  const [newName, setNewName] = useState(listName);
  const editMutation = useMutation({
    mutationFn: () => editList(listId, newName, token),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteList(listId, token),
    onSuccess: () => navigate("/lists"),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
    setIsError(false);
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
    if (!checkNameLength(newName)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editListName);
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
    setNewName(listName);
    setIsError(false);
    modal.provideId("");
    modal.toggleModal(false);
  };

  // div width
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerWidth = containerRef.current ? containerRef.current.clientWidth : 0;
    const headerWidth = headerRef.current ? headerRef.current.scrollWidth : 0;
    const el = document.getElementById("list-name-header");
    if (containerWidth - headerWidth > 0) el!.style.fontSize = "13.5px";
    else el!.style.fontSize = "20px";
  }, []);

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editList && (
        <Modal
          modalContent={
            <EditListModal
              newName={newName}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              isError={isError}
              errorId={errorId}
            />
          }
        />
      )}
      {modal.active && modal.contentId === ModalContentIdEnum.deleteList && (
        <Modal
          modalContent={<DeleteListModal handleDelete={handleDelete} handleCancel={handleCancel} />}
        />
      )}
      <div ref={containerRef} className="flex flex-row justify-between items-center">
        <div id="list-name-header" ref={headerRef}>
          <h4>{listName}</h4>
        </div>
        <div className="flex flex-row w-[60px]">
          <Button type="button" text={<Pencil />} handleClick={handleEditInit} disabled={active} />
          <Button type="button" text={<Trash />} disabled={active} handleClick={handleDeleteInit} />
        </div>
      </div>
    </>
  );
};

export default EditList;
