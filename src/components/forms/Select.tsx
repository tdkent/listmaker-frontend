import React from "react";

interface SelectProps {
  label: string;
  name: string;
  id: string;
  defaultValue: string;
  handleSelect: (e: React.FormEvent<HTMLSelectElement>) => void;
  options: string[] | number[];
}

const Select = ({ label, name, id, defaultValue, options, handleSelect }: SelectProps) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <select name={name} id={id} defaultValue={defaultValue} onChange={handleSelect}>
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
