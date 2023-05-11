interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string | JSX.Element;
  handleClick?: () => void;
  className?: string;
}

const Button = ({ type, text, className, handleClick }: ButtonProps) => {
  return (
    <div>
      <button type={type} onClick={handleClick} className={className}>
        {text}
      </button>
    </div>
  );
};

export default Button;
