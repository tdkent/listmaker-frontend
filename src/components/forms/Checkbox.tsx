import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
  disabled?: boolean;
}

const Checkbox = ({ checked, onChange, id, disabled }: CheckboxProps) => {
  const { active } = useContext(ErrorContext);
  return (
    <input
      type="checkbox"
      id={id || "item-checkbox"}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`form-checkbox bg-gray-50 border text-blue-500 rounded mr-2 ${
        active ? "border-gray-300 hover:border-gray-300" : "border-gray-600 hover:border-blue-500"
      }`}
    />
  );
};

export default Checkbox;
