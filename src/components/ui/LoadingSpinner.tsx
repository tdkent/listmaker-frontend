import ReactDOM from "react-dom";

import Circle from "../../icons/Circle";

const LoadingSpinner = () => {
  const content = (
    <div className="fixed z-50 w-full flex flex-row justify-center top-1/3">
      <Circle />
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("spinner")!);
};

export default LoadingSpinner;
