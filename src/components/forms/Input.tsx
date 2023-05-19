import Info from "../../icons/Info";
import { RegisterInputsEnum } from "../../models/auth";

interface InputProps {
  label: string;
  name: string;
  type: "email" | "text" | "password" | "number" | "date" | "time";
  required: boolean;
  id: string;
  value?: string;
  placeholder?: string;
  step?: number;
  disabled?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorString?: string;
  errorId?: string;
}

const Input = ({
  label,
  name,
  type,
  required,
  id,
  value,
  placeholder,
  disabled,
  handleChange,
  handleBlur,
  isError,
  errorString,
  errorId,
}: InputProps) => {
  return (
    <div className="mb-3 relative pb-4">
      <div className="flex justify-between items-center mb-1 pl-0.5 font-medium">
        <label htmlFor={name}>
          {label}
          {required && " *"}
        </label>
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
          className={`bg-gray-50 focus:bg-gray-50 border focus:border-2 hover:border-azure ${
            isError && errorId === id ? "border-tomato" : "border-gray-400"
          } rounded w-full p-2.5`}
        />
      </div>
      {isError && errorId === id && (
        <div className="inline-block absolute left-0.5 top-[calc(100%-1rem)]">
          <span className="text-sm text-tomato">{errorString}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
