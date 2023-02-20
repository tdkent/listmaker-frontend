interface FormInputProps {
  labelText: string;
  inputType: string;
  inputName: string;
  value?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FormInput = ({ labelText, inputType, inputName, handleChange }: FormInputProps) => {
  return (
    <div>
      <label>
        <span>{labelText + ":"}</span>
        <input type={inputType} name={inputName} onChange={handleChange} />
      </label>
    </div>
  );
};

export default FormInput;
