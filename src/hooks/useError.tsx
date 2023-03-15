import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import ToastError from "../components/ToastError";

const useError = () => {
  const [fetchError, setFetchError] = useState<AxiosError>();
  useEffect(() => {
    if (fetchError) {
      toast.error(<ToastError error={fetchError} />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [fetchError]);
  return { setFetchError };
};

export default useError;
