import { toast, cssTransition } from "react-toastify";
import "animate.css";

const slide = cssTransition({
  enter: "animate__animated animate__slideInUp animate__faster",
  exit: "animate__animated animate__slideOutDown animate__faster",
});

const successToast = (msg: string) =>
  toast.success(msg, {
    position: "bottom-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: slide,
    delay: 500,
    style: {
      backgroundColor: "#00b040",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      fontSize: "18px",
    },
  });

export default successToast;
