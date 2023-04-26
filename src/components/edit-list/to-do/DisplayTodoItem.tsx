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
  type: string;
  item: TodoListItemInt;
  setEditItemId: (value: React.SetStateAction<number | undefined>) => void;
  setItemChecked: (value: React.SetStateAction<boolean | undefined>) => void;
  setItemName: (value: React.SetStateAction<string>) => void;
  setItemCat: (value: React.SetStateAction<string>) => void;
}

const DisplayTodoItem = ({
  token,
  listId,
  type,
  item,
  setEditItemId,
  setItemChecked,
  setItemName,
  setItemCat,
}: DisplayTodoItemProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    mutationFn: (itemId: number) => checkTodoItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  // TODO: develop more and put into util function
  const itemDue = () => {
    const age = item.age.days;
    if (!age) return "Today";
    if (age === -1) return "Tomorrow";
    if (age === 1) return "Yesterday";
    if (age < 0) return "In " + Math.abs(age) + " days";
    return age + " days ago";
  };

  return (
    <li>
      <input
        type="checkbox"
        id={EditItemFormInputsEnum.check}
        name={EditItemFormInputsEnum.check}
        checked={item.isChecked}
        onChange={() => checkMutation.mutate(item.id)}
      />
      {item.name} {item.category}
      <p>{itemDue()}</p>
      <Button
        type="button"
        text="Edit"
        handleClick={() => {
          setEditItemId(item.id);
          setItemChecked(item.isChecked);
          setItemName(item.name);
          // setItemCat(item.perm_category);
          modal.provideId(ModalContentIdEnum.editTodoItem);
          modal.toggleModal(true);
        }}
      />
    </li>
  );
};

export default DisplayTodoItem;
