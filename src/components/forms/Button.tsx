interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string | JSX.Element;
  handleClick?: () => void;
  styles?: string;
  divStyles?: string;
  disabled?: boolean;
}

const Button = ({ type, text, handleClick, styles, divStyles, disabled }: ButtonProps) => {
  return (
    <div className={`${divStyles || "text-center"}`}>
      <button
        type={type}
        onClick={handleClick}
        className={`${styles}   ${
          typeof text === "object"
            ? "disabled:bg-white"
            : "disabled:bg-gray-300 disabled:hover:bg-gray-300 "
        }`}
        disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
