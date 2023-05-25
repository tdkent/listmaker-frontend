interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string | JSX.Element;
  handleClick?: () => void;
  styles?: string;
  disabled?: boolean;
}

const Button = ({ type, text, handleClick, styles, disabled }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={handleClick}
        className={`${styles}   ${
          typeof text === "object"
            ? "disabled:bg-white"
            : "disabled:bg-slate-300 disabled:hover:bg-slate-300 "
        }`}
        disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
