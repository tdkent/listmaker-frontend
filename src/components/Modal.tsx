import { useContext } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../context/ModalContext";
import Backdrop from "./Backdrop";

interface ModalContentProps {
  modalContent: JSX.Element;
}

const ModalContent = ({ modalContent }: ModalContentProps) => {
  const modal = <div>{modalContent}</div>;
  return ReactDOM.createPortal(modal, document.getElementById("modal")!);
};

const Modal = (props: ModalContentProps) => {
  const modal = useContext(ModalContext);
  return (
    <>
      <Backdrop
        handleClick={() => {
          modal.provideId("");
          modal.toggleModal(false);
        }}
      />
      <ModalContent {...props} />
    </>
  );
};

export default Modal;
