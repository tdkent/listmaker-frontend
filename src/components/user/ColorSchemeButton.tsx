interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  text: string;
}

const ColorSchemeButton = ({ children, handleClick, text }: Props) => {
  return (
    <button type="button" className="w-full" onClick={handleClick}>
      <div className="flex flex-row items-center px-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
        {children}
        <span className="ml-4">{text}</span>
      </div>
    </button>
  );
};

export default ColorSchemeButton;
