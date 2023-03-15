import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import useError from "../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../context/ModalContext";
import Modal from "./Modal";
import Input from "./forms/Input";
import Button from "./forms/Button";
import { ShoppingListInt, EditListInputsEnum } from "../models/lists";
import { editListName } from "../api/mutate-lists";
import { FormValidationInt } from "../models/errors";

// TODO: Props need to accept different types of lists
interface HeaderProps {
  list: ShoppingListInt;
}

const EditListHeader = ({ list }: HeaderProps) => {
  const auth = useContext(AuthContext);
  const { setFetchError } = useError();
  const [listName, setListName] = useState(list.name);
  const modal = useContext(ModalContext);
  const queryClient = useQueryClient();

  // errors
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // form submission
  const mutation = useMutation({
    //! body type will depend on list type
    mutationFn: (body: ShoppingListInt) => editListName(auth.token as string, body),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => queryClient.invalidateQueries(["list", list.id]),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value);
    setFormError(null);
  };

  const handleInit = () => {
    modal.provideId(ModalContentIdEnum.editList);
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
    if (listName !== list.name) {
      mutation.mutate({ ...list, name: listName });
    }
    modal.provideId("");
    modal.toggleModal(false);
  };

  const handleCancel = () => {
    setListName(list.name);
    setFormError(null);
    modal.provideId("");
    modal.toggleModal(false);
  };

  // modal
  const modalContent = (
    <div>
      <form>
        <Input
          label="Name"
          type="text"
          name={EditListInputsEnum.editName}
          id={EditListInputsEnum.editName}
          value={listName}
          handleChange={handleChange}
        />
        {formError && <span>{formError.message}</span>}
        <Button type="button" text="Submit" handleClick={handleSubmit} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editList && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed blue", padding: "1rem" }}>
        <div>
          <h2>{list.name}</h2>
          <Button type="button" text="Edit" handleClick={handleInit} />
        </div>
      </div>
    </>
  );
};

export default EditListHeader;
