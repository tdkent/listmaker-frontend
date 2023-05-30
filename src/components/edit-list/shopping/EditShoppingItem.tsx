import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import ErrorContext from "../../../context/ErrorContext";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editShoppingItem, removeShoppingItem } from "../../../api/mutate-shopping-items";
import { CheckedItemEnum } from "../../../models/item";
import { ShoppingListItemInt } from "../../../models/shopping";
import EditShoppingItemModal from "../../modal-content/EditShoppingItemModal";
import DisplayShoppingItem from "./DisplayShoppingItem";
import { checkNameBlank } from "../../../utils/form-validation";
import { InputIdsEnum } from "../../../models/forms";

interface EditShoppingItemProps {
  token: string;
  listId: number;
  items: ShoppingListItemInt[];
}

const EditShoppingItem = ({ token, listId, items }: EditShoppingItemProps) => {
  // error handling
  const modal = useContext(ModalContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");
  const { toggleError, provideData } = useContext(ErrorContext);

  // state
  const [editItemId, setEditItemId] = useState<number>();
  const [itemName, setItemName] = useState<string>("");
  const [itemCat, setItemCat] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) => editShoppingItem(listId, itemId, itemName, itemCat, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeShoppingItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  // handler functions
  const handleSave = () => {
    if (!checkNameBlank(itemName)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editShopName);
    }
    if (!checkNameBlank(itemCat)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.editShopCat);
    }
    editMutation.mutate(editItemId!);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleDelete = () => {
    removeMutation.mutate(editItemId!);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleCancel = () => {
    setItemName("");
    setItemCat("");
    setIsError(false);
    modal.provideId("");
    modal.toggleModal(false);
  };

  // put all unique category names into sorted array
  const categories = items
    .map((obj) => obj.dispCategory)
    .filter((val, idx, arr) => arr.indexOf(val) === idx)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const sortedItems = [...items].sort((a, b) =>
    a.itemName.toLowerCase().localeCompare(b.itemName.toLowerCase())
  );

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editShoppingItem && (
        <Modal
          modalContent={
            <EditShoppingItemModal
              itemName={itemName}
              setItemName={setItemName}
              itemCat={itemCat}
              setItemCat={setItemCat}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              isError={isError}
              setIsError={setIsError}
              errorId={errorId}
            />
          }
        />
      )}
      <div className="lg:mt-10">
        {categories.map(
          (cat) =>
            cat !== CheckedItemEnum.check && (
              <div key={categories.indexOf(cat)} className="mb-2">
                <div>
                  <span className="font-medium">{cat}</span>
                </div>
                <ul>
                  {sortedItems.map(
                    (item) =>
                      item.dispCategory === cat &&
                      !item.isChecked && (
                        <div key={item.itemId}>
                          <DisplayShoppingItem
                            token={token}
                            listId={listId}
                            item={item}
                            setEditItemId={setEditItemId}
                            setItemName={setItemName}
                            setItemCat={setItemCat}
                          />
                        </div>
                      )
                  )}
                </ul>
              </div>
            )
        )}
        {categories.includes(CheckedItemEnum.check) && (
          <div>
            <div>
              <span className="font-medium">Checked Items</span>
            </div>
            <ul>
              {sortedItems.map(
                (item) =>
                  item.isChecked && (
                    <div key={item.itemId}>
                      <DisplayShoppingItem
                        token={token}
                        listId={listId}
                        item={item}
                        setEditItemId={setEditItemId}
                        setItemName={setItemName}
                        setItemCat={setItemCat}
                      />
                    </div>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default EditShoppingItem;
