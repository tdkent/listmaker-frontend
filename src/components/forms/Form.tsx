import React from "react";

interface FormProps {
  children: React.ReactNode;
  id: string;
  onSubmit?: (e: React.FormEvent) => void;
}

const Form = ({ children, id, onSubmit }: FormProps) => {
  return (
    <form id={id} onSubmit={onSubmit} className="flex flex-col">
      {children}
    </form>
  );
};

export default Form;
