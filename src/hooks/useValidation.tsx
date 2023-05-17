import { useState } from "react";

const useValidation = () => {
  const [validEmail, setValidEmail] = useState(true);
  return { validEmail, setValidEmail };
};

export default useValidation;
