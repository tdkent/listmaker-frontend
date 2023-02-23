import { useState, useRef, useContext } from "react";

import ModalContext from "../context/ModalContext";
import { ShoppingListInt } from "../models/lists";
import { editListName } from "../api/edit-list";
import { EditListReducerActionInt } from "../models/edit-list";

interface EditListHeaderProps {
  list: ShoppingListInt;
  dispatch: React.Dispatch<any>;
}

const EditListHeader = ({ list, dispatch }: EditListHeaderProps) => {
  const [name, setName] = useState(list.name);
  const modal = useContext(ModalContext);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: ShoppingListInt = { ...list, name };
    const payload = await editListName(list.id, body);
    console.log("payload: ", payload);
    // dispatch({
    //   type: "EDIT_LIST_NAME",
    //   payload,
    // });
    modal.toggleModal(false);
  };

  return (
    <div style={{ border: "1px dashed blue", padding: "1rem" }}>
      <div>
        <h2>{list.name}</h2>
        <button onClick={() => modal.toggleModal(true)}>Edit</button>
      </div>

      {modal.active && (
        <div>
          <form onSubmit={submitHandler}>
            <label htmlFor="edit-list-name">
              <input
                type="text"
                name="edit-list-name"
                autoFocus={true}
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
              />
            </label>
            <button type="submit">Submit</button>
            <button onClick={() => modal.toggleModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditListHeader;
