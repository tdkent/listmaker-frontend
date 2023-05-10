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
    <div>
      <div>
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
        />
      </div>
    </div>
  );
};

export default Input;
