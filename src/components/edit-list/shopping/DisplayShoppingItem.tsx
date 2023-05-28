import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../../context/ErrorContext";
import Button from "../../forms/Button";
import Checkbox from "../../forms/Checkbox";
import Pencil from "../../../icons/Pencil";
import { ShoppingListItemInt } from "../../../models/shopping";
import { checkShoppingItem } from "../../../api/mutate-shopping-items";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";

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
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const modal = useContext(ModalContext);
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    mutationFn: (itemId: number) => checkShoppingItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  return (
    <>
      <li className="flex items-center justify-between py-1">
        <div>
          <Checkbox
            id={`item-checkbox-${item.itemId}`}
            checked={item.isChecked}
            disabled={active}
            onChange={() => checkMutation.mutate(item.itemId)}
          />
          <span className={`${item.isChecked && "line-through text-gray-600"}`}>
            {item.itemName}
          </span>
        </div>
        <div>
          <Button
            type="button"
            disabled={active}
            text={<Pencil />}
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
    </>
  );
};

export default DisplayShoppingItem;
