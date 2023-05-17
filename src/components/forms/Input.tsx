import Info from "../../icons/Info";
import { RegisterInputsEnum } from "../../models/auth";

interface InputProps {
  label: string;
  name: string;
  type: "email" | "text" | "password" | "number" | "date" | "time";
  id: string;
  value?: string;
  placeholder?: string;
  step?: number;
  disabled?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  name,
  type,
  id,
  value,
  placeholder,
  disabled,
  handleChange,
  handleBlur,
}: InputProps) => {
  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center mb-1 pl-0.5 font-medium">
        <label htmlFor={name}>{label}</label>
        {id === RegisterInputsEnum.password && <Info />}
      </div>
      <div>
        <input
          name={name}
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`bg-gray-50 border border-gray-400 rounded-md w-full p-2.5`}
        />
      </div>
    </div>
  );
};

export default Input;
