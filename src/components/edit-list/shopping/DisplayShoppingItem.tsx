import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Button from "../../forms/Button";
import Checkbox from "../../forms/Checkbox";
import Pencil from "../../../icons/Pencil";
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
    <li className="flex items-center justify-between py-1">
      <div>
        <Checkbox checked={item.isChecked} onChange={() => checkMutation.mutate(item.itemId)} />
        <span className={`${item.isChecked && "line-through text-gray-600"}`}>{item.itemName}</span>
      </div>
      <div>
        <Button
          type="button"
          text={<Pencil styles="w-5 h-5 stroke-gray-600 mr-1 mt-1" />}
          handleClick={() => {
            setEditItemId(item.itemId);
            setItemName(item.itemName);
            setItemCat(item.refCategory);
            modal.provideId(ModalContentIdEnum.editShoppingItem);
            modal.toggleModal(true);
          }}
        />
      </div>
    </li>
  );
};

export default DisplayShoppingItem;
