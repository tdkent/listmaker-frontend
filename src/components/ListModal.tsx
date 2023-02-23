import { useContext } from "react";

import ModalContext from "../context/ModalContext";
import { ShoppingListInt } from "../models/shopping-list";
import { editListName } from "../api/edit-list";

interface ListModalPropsInt {
  listData: ShoppingListInt[];
  setListData: React.Dispatch<React.SetStateAction<ShoppingListInt[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = ({ listData, setListData, text, setText }: ListModalPropsInt) => {
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
        <header>Edit List</header>
      </div>
      <div>
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
      </div>
      <div>
        <button onClick={() => modal.toggleModal(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
