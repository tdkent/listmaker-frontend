interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string | JSX.Element;
  handleClick?: () => void;
  styles?: string;
}

const Button = ({ type, text, handleClick, styles }: ButtonProps) => {
  return (
    <div>
      <button type={type} onClick={handleClick} className={styles}>
        {text}
      </button>
    </div>
  );
};

export default Button;
