interface InputProps {
  label: string;
  name: string;
  type: "email" | "text" | "password";
  id: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, type, id, handleChange }: InputProps) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input name={name} type={type} id={id} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Input;
