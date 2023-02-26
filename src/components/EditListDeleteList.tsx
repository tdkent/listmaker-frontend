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

  const modalContent = (
    <div>
      <p>Are you sure want to delete this list?</p>
      <form>
        <button
          type="button"
          onClick={() => {
            mutate.mutate();
            modal.provideId("");
            modal.toggleModal(false);
            navigate("/lists");
          }}>
          Delete
        </button>
        <button
          type="button"
          onClick={() => {
            modal.provideId("");
            modal.toggleModal(false);
          }}>
          Cancel
        </button>
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
