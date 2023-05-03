interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      id="item-checkbox"
      name="item-checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
