interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  handleClick?: () => void;
}

const Button = ({ type, text, handleClick }: ButtonProps) => {
  return (
    <div>
      <button type={type} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
