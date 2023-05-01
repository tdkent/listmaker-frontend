import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Button from "../../forms/Button";
import { EditItemFormInputsEnum, TodoListItemInt } from "../../../models/item";
import { checkTodoItem } from "../../../api/mutate-todo-items";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import useError from "../../../hooks/useError";

interface DisplayTodoItemProps {
  token: string;
  listId: number;
  listType: string;
  item: TodoListItemInt;
  setId: (value: React.SetStateAction<number | undefined>) => void;
  setName: (value: React.SetStateAction<string>) => void;
  setCat: (value: React.SetStateAction<string>) => void;
  setLoc: (value: React.SetStateAction<string>) => void;
  setDate: (value: React.SetStateAction<string>) => void;
  setTime: (value: React.SetStateAction<string | null>) => void;
}

const DisplayTodoItem = ({
  token,
  listId,
  listType,
  item,
  setId,
  setName,
  setCat,
  setLoc,
  setDate,
  setTime,
}: DisplayTodoItemProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    mutationFn: (itemId: number) => checkTodoItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  // TODO: function for due date display

  return (
    <li>
      <input
        type="checkbox"
        id={EditItemFormInputsEnum.check}
        name={EditItemFormInputsEnum.check}
        checked={item.isChecked}
        onChange={() => checkMutation.mutate(item.itemId)}
      />
      {item.itemName} {item.itemCategory}
      <Button
        type="button"
        text="Edit"
        handleClick={() => {
          setId(item.itemId);
          setName(item.itemName);
          setCat(item.itemCategory);
          setLoc(item.itemLocation || "");
          setDate(item.dateDue);
          setTime(item.timeDue || null);
          modal.provideId(ModalContentIdEnum.editTodoItem);
          modal.toggleModal(true);
        }}
      />
    </li>
  );
};

export default DisplayTodoItem;
