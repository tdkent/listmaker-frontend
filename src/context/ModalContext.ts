import { createContext } from "react";

export enum ModalContentIdEnum {
  editList = "EDIT_LIST",
  deleteList = "DELETE_LIST",
  editShoppingItem = "EDIT_SHOPPING_ITEM",
  displayTodoItem = "DISPLAY_TODO_ITEM",
  editTodoItem = "EDIT_TODO_ITEM",
  editSubtasks = "EDIT_SUBTASK",
}

export interface ModalContextInt {
  active: boolean;
  contentId: ModalContentIdEnum | "";
  toggleModal: (value: boolean) => void;
  provideId: (value: ModalContentIdEnum | "") => void;
}

const ModalContext = createContext<ModalContextInt>({
  active: false,
  contentId: "",
  toggleModal: () => {},
  provideId: () => {},
});

export default ModalContext;
