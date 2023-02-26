import { createContext } from "react";

export enum ModalContentIdEnum {
  editList = "EDIT_LIST",
  deleteList = "DELETE_LIST",
}

export interface ModalContextInt {
  active: boolean;
  pending: boolean;
  contentId: ModalContentIdEnum | "";
  toggleModal: (value: boolean) => void;
  togglePending: (value: boolean) => void;
  provideId: (value: ModalContentIdEnum | "") => void;
}

const ModalContext = createContext<ModalContextInt>({
  active: false,
  pending: false,
  contentId: "",
  toggleModal: () => {},
  togglePending: () => {},
  provideId: () => {},
});

export default ModalContext;
