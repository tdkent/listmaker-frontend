import ReactDOM from "react-dom";

interface BackdropProps {
  handleClick: () => void;
}

const Backdrop = ({ handleClick }: BackdropProps) => {
  const backdrop = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 10,
        background: "rgba(0, 0, 0, 0.75)",
      }}
      onClick={handleClick}
    />
  );
  return ReactDOM.createPortal(backdrop, document.getElementById("backdrop")!);
};

export default Backdrop;
