interface Props {
  children: React.ReactNode;
}

const ColorSchemeButton = ({ children }: Props) => {
  return (
    <button>
      <div>{children}</div>
    </button>
  );
};

export default ColorSchemeButton;
