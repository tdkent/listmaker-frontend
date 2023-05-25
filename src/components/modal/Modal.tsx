import { useContext } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../../context/ModalContext";
import ErrorContext from "../../context/ErrorContext";
import Backdrop from "./Backdrop";
import ShowApiError from "../errors/ShowApiError";

interface ModalContentProps {
  modalContent: JSX.Element;
}

const ModalContent = ({ modalContent }: ModalContentProps) => {
  const { active, data } = useContext(ErrorContext);
  const modal = useContext(ModalContext);
  const modalDisplay = (
    <div className="z-30 fixed w-full h-screen overflow-auto l-0 bg-white p-2 rounded-lg top-8">
      {active && modal.active && <ShowApiError errorData={data!} />}
      {modalContent}
    </div>
  );
  return ReactDOM.createPortal(modalDisplay, document.getElementById("modal")!);
};

const Modal = (props: ModalContentProps) => {
  const modal = useContext(ModalContext);
  const { toggleError, provideData } = useContext(ErrorContext);
  return (
    <>
      <Backdrop
        handleClick={() => {
          modal.provideId("");
          modal.toggleModal(false);
          toggleError(false);
          provideData(null);
        }}
      />
      <ModalContent {...props} />
    </>
  );
};

export default Modal;
