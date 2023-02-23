import { createContext } from "react";

export interface ModalContextInt {
  active: boolean;
  pending: boolean;
  toggleModal: (value: boolean) => void;
  togglePending: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextInt>({
  active: false,
  pending: false,
  toggleModal: () => {},
  togglePending: () => {},
});

export default ModalContext;
