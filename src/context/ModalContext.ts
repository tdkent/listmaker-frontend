import { createContext } from "react";

// ? Turn this into a hook instead?

export enum ModalContentIdEnum {
  editList = "EDIT_LIST",
  deleteList = "DELETE_LIST",
  editItem = "EDIT_ITEM",
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
