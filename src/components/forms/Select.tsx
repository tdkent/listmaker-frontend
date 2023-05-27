import React from "react";

interface SelectProps {
  label: string;
  required: boolean;
  name?: string;
  id: string;
  defaultValue: string;
  handleSelect: (e: React.FormEvent<HTMLSelectElement>) => void;
  options: string[] | number[];
  flex?: boolean;
}

const Select = ({
  label,
  name,
  id,
  defaultValue,
  options,
  handleSelect,
  required,
  flex,
}: SelectProps) => {
  return (
    <div className={`${flex && "flex flex-row justify-between items-center w-2/3"}`}>
      <div className={`mb-1 font-medium ${flex && "grow-0 mr-4"}`}>
        <label htmlFor={name}>
          {label}
          {required && " *"}
        </label>
      </div>
      <div className={`${flex && "grow"}`}>
        <select
          name={name}
          id={id}
          defaultValue={defaultValue}
          onChange={handleSelect}
          className="form-select w-full mb-3 p-2.5 rounded-md bg-gray-50 border border-gray-400">
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
