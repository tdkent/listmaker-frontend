import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import ErrorToast from "../components/errors/ErrorToast";

const useError = () => {
  const [fetchError, setFetchError] = useState<AxiosError>();
  useEffect(() => {
    if (fetchError) {
      toast.error(<ErrorToast error={fetchError} />, {
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
