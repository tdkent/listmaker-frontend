import Info from "../../icons/Info";
import { InputIdsEnum } from "../../models/forms";
import Tooltip from "./Tooltip";

interface InputProps {
  label: string;
  type: "email" | "text" | "password" | "number" | "date" | "time";
  required: boolean;
  id: string;
  value?: string;
  step?: number;
  disabled?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorString?: string;
  errorId?: string;
}

const Input = ({
  label,
  type,
  required,
  id,
  value,
  disabled,
  handleChange,
  isError,
  errorString,
  errorId,
}: InputProps) => {
  return (
    <div className="relative mb-1.5 pb-4">
      <div className="flex justify-between items-center mb-1 pl-0.5 font-medium">
        <label htmlFor={id}>
          {label}
          {required && " *"}
        </label>
        {(id === InputIdsEnum.regPass ||
          id === InputIdsEnum.regName ||
          id === InputIdsEnum.newListName) && <Tooltip id={id} />}
      </div>
      <div>
        <input
          type={type}
          id={id}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={`bg-gray-50 focus:gray-50 border ${!isError && `hover:border-blue-500`} ${
            isError && errorId === id ? "border-red-500" : "border-gray-600"
          } rounded w-full p-2.5 lg:py-4`}
        />
      </div>
      {isError && errorId === id && (
        <div className="inline-block absolute left-0.5 top-[calc(100%-1.1rem)]">
          <span className="text-sm text-red-500">{errorString}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
