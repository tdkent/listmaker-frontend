interface FormInputProps {
  labelText: string;
  inputType: string;
  inputName: string;
  value?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FormInput = ({ labelText, inputType, inputName, handleChange, value }: FormInputProps) => {
  return (
    <div>
      <label>
        <span>{labelText + ":"}</span>
        <input type={inputType} name={inputName} onChange={handleChange} value={value} />
      </label>
    </div>
  );
};

export default FormInput;
