import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import Button from "../../forms/Button";
import { EditItemFormInputsEnum, ShoppingListItemInt } from "../../../models/item";
import { checkItem } from "../../../api/mutate-lists";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import useError from "../../../hooks/useError";

interface DisplayShoppingItemProps {
  token: string;
  id: number;
  type: string;
  item: ShoppingListItemInt;
  setEditItemId: (value: React.SetStateAction<number | undefined>) => void;
  setItemChecked: (value: React.SetStateAction<boolean | undefined>) => void;
  setItemName: (value: React.SetStateAction<string>) => void;
  setItemCat: (value: React.SetStateAction<string>) => void;
}

const DisplayShoppingItem = ({
  token,
  id,
  type,
  item,
  setEditItemId,
  setItemChecked,
  setItemName,
  setItemCat,
}: DisplayShoppingItemProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const queryClient = useQueryClient();
  const checkShoppingItem = useMutation({
    mutationFn: ({ itemId, isChecked }: { itemId: number; isChecked: boolean }) =>
      checkItem(id, type, itemId, isChecked, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  return (
    <li>
      <input
        type="checkbox"
        id={EditItemFormInputsEnum.check}
        name={EditItemFormInputsEnum.check}
        checked={item.isChecked}
        onChange={() =>
          checkShoppingItem.mutate({
            itemId: item.id,
            isChecked: item.isChecked,
          })
        }
      />
      {item.name}
      <Button
        type="button"
        text="Edit"
        handleClick={() => {
          setEditItemId(item.id);
          setItemChecked(item.isChecked);
          setItemName(item.name);
          setItemCat(item.perm_category);
          modal.provideId(ModalContentIdEnum.editShoppingItem);
          modal.toggleModal(true);
        }}
      />
    </li>
  );
};

export default DisplayShoppingItem;
