interface InputProps {
  label: string;
  name: string;
  type: "email" | "text" | "password" | "number" | "date" | "time";
  id: string;
  value?: string;
  step?: number;
  disabled?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, type, id, value, disabled, handleChange }: InputProps) => {
  return (
    <div className="flex flex-col mb-3">
      <div className="mb-1">
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          name={name}
          type={type}
          id={id}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className="border border-gray-400 rounded w-full p-2"
        />
      </div>
    </div>
  );
};

export default Input;
