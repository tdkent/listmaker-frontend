import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  disabled?: boolean;
}

const Checkbox = ({ checked, onChange, id, disabled }: CheckboxProps) => {
  const { active } = useContext(ErrorContext);
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`form-checkbox bg-gray-100 border text-blue-600 dark:text-green-700 rounded mr-2 ${
        active
          ? "border-gray-300 hover:border-gray-300"
          : "border-gray-600 hover:border-blue-600 dark:hover:border-green-700"
      }`}
    />
  );
};

export default Checkbox;
