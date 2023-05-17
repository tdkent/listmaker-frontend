import ReactDOM from "react-dom";

interface BackdropProps {
  handleClick: () => void;
}

const Backdrop = ({ handleClick }: BackdropProps) => {
  const backdrop = (
    <div className="z-10 fixed top-0 l-0 w-full h-screen bg-black/75" onClick={handleClick} />
  );
  return ReactDOM.createPortal(backdrop, document.getElementById("backdrop")!);
};

export default Backdrop;
