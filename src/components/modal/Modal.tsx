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
    //   <div
    //     className={`z-30 absolute lg:shadow-xl w-full h-screen overflow-auto left-0 bg-white p-2 rounded-lg top-8
    // lg:w-[calc(1024px*0.6)] lg:top-[92px] lg:h-[70%] lg:left-[calc(50%-(1024px*0.6/2))]`}>
    //     {active && modal.active && <ShowApiError errorData={data!} />}
    //     {modalContent}
    //   </div>
    <div
      className={`z-30 fixed w-full h-screen overflow-auto left-0 bg-white rounded-lg top-8
lg:w-[calc(1024px*0.6)] lg:top-[92px] lg:h-[70%] lg:left-[calc(50%-(1024px*0.6/2))] lg:shadow-xl`}>
      <div
        id="modal-content"
        className="max-lg:p-4 max-lg:overflow-auto max-lg:relative max-lg:w-full max-lg:max-w-full max-lg:max-h-full">
        {active && modal.active && <ShowApiError errorData={data!} />}
        {modalContent}
      </div>
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
