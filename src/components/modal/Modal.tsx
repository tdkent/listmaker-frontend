import { useContext } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../../context/ModalContext";
import Backdrop from "./Backdrop";

interface ModalContentProps {
  modalContent: JSX.Element;
}

const ModalContent = ({ modalContent }: ModalContentProps) => {
  const modal = (
    <div
      style={{
        zIndex: 100,
        position: "fixed",
        top: "22vh",
        left: "25%",
        width: "50%",
        background: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
        borderRadius: "8px",
        padding: "2rem",
      }}>
      {modalContent}
    </div>
  );
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
