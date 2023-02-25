import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ModalContext from "../context/ModalContext";
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
  return (
    <div style={{ border: "1px dashed orange", padding: "1rem" }}>
      {modal.active && (
        <div>
          <header>Are you sure want to delete this list?</header>
          <button type="submit" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={() => modal.toggleModal(false)}>Cancel</button>
        </div>
      )}
      <div>
        <button onClick={() => modal.toggleModal(true)}>Delete List</button>
      </div>
    </div>
  );
};

export default EditListDeleteList;
