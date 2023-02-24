import { useContext } from "react";

import ModalContext from "../context/ModalContext";
import { ShoppingListInt } from "../models/shopping-list";
import { editListName } from "../api/mutate-lists";

interface ModalPropsInt {
  name: "list" | "item";
  mode: "edit" | "delete";
  header: string;
  listData: ShoppingListInt[];
  setListData: React.Dispatch<React.SetStateAction<ShoppingListInt[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = ({ name, mode, header, listData, setListData, text, setText }: ModalPropsInt) => {
  const modal = useContext(ModalContext);

  const handleListEdit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // modal.togglePending(true);
    // const body: ShoppingListInt = { ...listData[0], name: text };
    // const data = await editListName(listData[0].id, body);
    // setListData([data]);
    // modal.togglePending(false);
    // modal.toggleModal(false);
  };

  return (
    <div style={{ border: "1px black solid" }}>
      <div>
        <header>{header}</header>
      </div>
      <div>
        {name === "list" && mode === "edit" && (
          <form onSubmit={handleListEdit}>
            <input
              type="text"
              autoFocus={true}
              value={text}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setText(e.currentTarget.value);
              }}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
      <div>
        <button onClick={() => modal.toggleModal(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
