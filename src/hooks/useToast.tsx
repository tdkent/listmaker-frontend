import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SuccessToast from "../components/toast-content/SuccessToast";

const useToast = () => {
  const [msg, setMsg] = useState<string>("");
  useEffect(() => {
    if (msg) {
      toast.success(<SuccessToast msg={msg} />, {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [msg]);
  return { setMsg };
};

export default useToast;
