import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
import ModalContext, { ModalContentIdEnum } from "../../../context/ModalContext";
import Modal from "../../modal/Modal";
import { editShoppingItem, removeShoppingItem } from "../../../api/mutate-shopping-items";
import { ShoppingListItemInt, CheckedItemEnum } from "../../../models/item";
import EditShoppingItemModal from "../../modal-content/EditShoppingItemModal";
import DisplayShoppingItem from "./DisplayShoppingItem";

interface EditShoppingItemProps {
  token: string;
  listId: number;
  type: string;
  items: ShoppingListItemInt[];
}

const EditShoppingItem = ({ token, listId, type, items }: EditShoppingItemProps) => {
  // error handling
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();

  // state
  const [editItemId, setEditItemId] = useState<number>();
  const [itemName, setItemName] = useState<string>("");
  const [itemCat, setItemCat] = useState<string>("");

  // mutations
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (itemId: number) => editShoppingItem(listId, itemId, itemName, itemCat, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeShoppingItem(listId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  // handler functions
  const handleSave = () => {
    editMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleDelete = () => {
    removeMutation.mutate(editItemId as number);
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleCancel = () => {
    setItemName("");
    setItemCat("");
    modal.provideId("");
    modal.toggleModal(false);
  };

  // put all unique category names into sorted array
  const categories = items
    .map((obj) => obj.temp_category)
    .filter((val, idx, arr) => arr.indexOf(val) === idx)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

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
            />
          }
        />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        {categories.map(
          (cat) =>
            cat !== CheckedItemEnum.check && (
              <div key={categories.indexOf(cat)}>
                <h4>{cat}</h4>
                <ul>
                  {items.map(
                    (item) =>
                      item.temp_category === cat &&
                      !item.isChecked && (
                        <div key={item.id}>
                          <DisplayShoppingItem
                            token={token}
                            id={listId}
                            type={type}
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
            <h4>Checked Items</h4>
            <ul>
              {items.map(
                (item) =>
                  item.isChecked && (
                    <div key={item.id}>
                      <DisplayShoppingItem
                        token={token}
                        id={listId}
                        type={type}
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
