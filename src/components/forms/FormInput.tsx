interface FormInputProps {
  labelText: string;
  inputType: string;
  inputName: string;
}

const FormInput = ({ labelText, inputType, inputName }: FormInputProps) => {
  return (
    <div>
      <label>
        <span>{labelText}</span>
        <input type={inputType} name={inputName} />
      </label>
    </div>
  );
};

export default FormInput;
