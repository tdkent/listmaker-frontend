interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string | JSX.Element;
  handleClick?: () => void;
}

// TODO: need different style presets for different buttons
// TODO: check adding custom styles / component classes section of Tailwind docs
// TODO: an alternative approach is to pass styles as prop to className for each button instance

const Button = ({ type, text, handleClick }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={handleClick}
        className="w-full border rounded-md mt-4 px-4 py-2 transition ease-in duration-500 bg-azure hover:bg-azure-medium text-white font-semibold">
        {text}
      </button>
    </div>
  );
};

export default Button;
