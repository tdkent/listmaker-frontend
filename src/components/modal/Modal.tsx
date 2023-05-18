import { useContext } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../../context/ModalContext";
import Backdrop from "./Backdrop";

interface ModalContentProps {
  modalContent: JSX.Element;
}

const ModalContent = ({ modalContent }: ModalContentProps) => {
  const modalDisplay = (
    <div className="z-50 fixed w-full h-screen overflow-auto l-0 bg-white p-2 rounded-lg top-8">
      {modalContent}
    </div>
  );
  return ReactDOM.createPortal(modalDisplay, document.getElementById("modal")!);
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
