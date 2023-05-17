interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      id="item-checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox bg-gray-50 border border-gray-400 rounded text-azure mr-2 mb-0.5"
    />
  );
};

export default Checkbox;
