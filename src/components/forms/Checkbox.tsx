interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

const Checkbox = ({ checked, onChange, id }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      id={id || "item-checkbox"}
      checked={checked}
      onChange={onChange}
      className="form-checkbox bg-gray-50 border border-gray-400 rounded text-azure mr-2"
    />
  );
};

export default Checkbox;
