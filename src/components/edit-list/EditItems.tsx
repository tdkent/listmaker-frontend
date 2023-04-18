import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import { ShoppingListInt } from "../../models/lists";
import ModalContext, { ModalContentIdEnum } from "../../context/ModalContext";
import Modal from "../modal/Modal";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { editItem, checkItem, deleteItem } from "../../api/mutate-lists";
import { EditListInputsEnum, FetchSingleListInt } from "../../models/lists";
import { ShoppingListItemInt } from "../../models/item";
import updateAllItems from "../../utils/update-item";

interface EditItemsProps {
  token: string;
  id: number;
  type: string;
  items: FetchSingleListInt["items"];
}

const EditItems = ({ token, id, type, items }: EditItemsProps) => {
  const modal = useContext(ModalContext);
  const { setFetchError } = useError();
  const [editItemId, setEditItemId] = useState<number>();
  const [itemChecked, setItemChecked] = useState<boolean>();
  const [itemName, setItemName] = useState<string>("");
  const [itemCat, setItemCat] = useState<string>("");
  const queryClient = useQueryClient();
  const checkMutation = useMutation({
    // TODO: type the list types to limit to available list types only
    mutationFn: ({ itemId, isChecked }: { itemId: number; isChecked: boolean }) =>
      checkItem(id, type, itemId, isChecked, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const editMutation = useMutation({
    mutationFn: ({ itemId, isChecked }: { itemId: number; isChecked: boolean }) =>
      editItem(id, itemId, isChecked, itemName, itemCat, type, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });
  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => deleteItem(id, type, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", id]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleSave = () => {
    editMutation.mutate({ itemId: editItemId as number, isChecked: itemChecked as boolean });
    modal.provideId("");
    modal.toggleModal(false);
    setItemName("");
    setItemCat("");
  };
  const handleDelete = () => {
    deleteMutation.mutate(editItemId as number);
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

  const modalContent = (
    <div>
      <form>
        {/* TODO: Add autofocus prop to Input component */}
        <Input
          label="Edit item"
          type="text"
          name={EditListInputsEnum.editItem}
          id={EditListInputsEnum.editItem}
          value={itemName}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setItemName(e.currentTarget.value);
          }}
        />
        <Input
          label="Category"
          type="text"
          name="itemCategory"
          id="itemCategory"
          value={itemCat}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => setItemCat(e.currentTarget.value)}
        />
        <Button type="button" text="Save" handleClick={handleSave} />
        <Button type="button" text="Delete" handleClick={handleDelete} />
        <Button type="button" text="Cancel" handleClick={handleCancel} />
      </form>
    </div>
  );

  // TODO: item display depends on list / item type

  // puts all unique category names into an array
  const categories = items
    .map((obj) => obj.temp_category)
    .filter((val, idx, arr) => arr.indexOf(val) === idx)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const checkedInArray = categories.includes("Checked");

  return (
    <>
      {modal.active && modal.contentId === ModalContentIdEnum.editItem && (
        <Modal modalContent={modalContent} />
      )}
      <div style={{ border: "1px dashed pink", padding: "1rem", margin: "1rem 0" }}>
        {categories.map(
          (cat) =>
            cat !== "Checked" && (
              <div key={cat}>
                <h4>{cat}</h4>
                <ul>
                  {items.map(
                    (item) =>
                      item.temp_category === cat &&
                      !item.isChecked && (
                        <li key={item.id}>
                          <input
                            type="checkbox"
                            id={EditListInputsEnum.checkItem}
                            name={EditListInputsEnum.checkItem}
                            checked={item.isChecked}
                            onChange={() =>
                              checkMutation.mutate({ itemId: item.id, isChecked: item.isChecked })
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
                              modal.provideId(ModalContentIdEnum.editItem);
                              modal.toggleModal(true);
                            }}
                          />
                        </li>
                      )
                  )}
                </ul>
              </div>
            )
        )}
        {checkedInArray && (
          <div>
            <h4>Checked</h4>
            <ul>
              {items.map(
                (item) =>
                  item.isChecked && (
                    <li key={item.id}>
                      <input
                        type="checkbox"
                        id={EditListInputsEnum.checkItem}
                        name={EditListInputsEnum.checkItem}
                        checked={item.isChecked}
                        onChange={() =>
                          checkMutation.mutate({ itemId: item.id, isChecked: item.isChecked })
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
                          modal.provideId(ModalContentIdEnum.editItem);
                          modal.toggleModal(true);
                        }}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default EditItems;
