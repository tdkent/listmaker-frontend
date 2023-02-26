import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ModalContext, { ModalContentIdEnum } from "../context/ModalContext";
import Modal from "./Modal";
import { deleteList } from "../api/mutate-lists";

interface DeleteListProps {
  listId: number;
}

const EditListDeleteList = ({ listId }: DeleteListProps) => {
  const queryClient = useQueryClient();
  const modal = useContext(ModalContext);
  const navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: () => deleteList(listId),
    onSuccess: () => {
      queryClient.invalidateQueries(["list", listId]);
    },
  });
  const handleDelete = () => {
    mutate.mutate();
    navigate("/lists");
  };

  const modalContent = (
    <div
      style={{
        zIndex: 100,
        position: "fixed",
        top: "22vh",
        left: "25%",
        width: "50%",
        background: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
        borderRadius: "8px",
        padding: "2rem",
      }}>
      <header>Are you sure want to delete this list?</header>
      <button type="submit" onClick={handleDelete}>
        Delete
      </button>
      <button
        onClick={() => {
          modal.provideId("");
          modal.toggleModal(false);
        }}>
        Cancel
      </button>
    </div>
  );

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.deleteList && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed orange", padding: "1rem" }}>
        <div>
          <button
            onClick={() => {
              modal.provideId(ModalContentIdEnum.deleteList);
              modal.toggleModal(true);
            }}>
            Delete List
          </button>
        </div>
      </div>
    </>
  );
};

export default EditListDeleteList;
