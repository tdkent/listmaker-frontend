import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Button from "../../forms/Button";
import { EditItemFormInputsEnum } from "../../../models/item";
import { ShoppingListItemInt } from "../../../models/shopping";
import { checkShoppingItem } from "../../../api/mutate-shopping-items";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import useError from "../../../hooks/useError";

interface DisplayShoppingItemProps {
  token: string;
  listId: number;
  item: ShoppingListItemInt;
  setEditItemId: (value: React.SetStateAction<number | undefined>) => void;
  setItemName: (value: React.SetStateAction<string>) => void;
  setItemCat: (value: React.SetStateAction<string>) => void;
}

const DisplayShoppingItem = ({
  token,
  listId,
  item,
  setEditItemId,
  setItemName,
  setItemCat,
}: DisplayShoppingItemProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    mutationFn: (itemId: number) => checkShoppingItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  return (
    <li>
      <input
        type="checkbox"
        id={EditItemFormInputsEnum.check}
        name={EditItemFormInputsEnum.check}
        checked={item.isChecked}
        onChange={() => checkMutation.mutate(item.itemId)}
      />
      {item.itemName}
      <Button
        type="button"
        text="Edit"
        handleClick={() => {
          setEditItemId(item.itemId);
          setItemName(item.itemName);
          setItemCat(item.refCategory);
          modal.provideId(ModalContentIdEnum.editShoppingItem);
          modal.toggleModal(true);
        }}
      />
    </li>
  );
};

export default DisplayShoppingItem;
