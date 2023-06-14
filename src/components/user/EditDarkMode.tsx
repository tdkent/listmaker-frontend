import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import Cog from "../../icons/Cog";
import Hyperlink from "../forms/Hyperlink";
import ColorSchemeButton from "./ColorSchemeButton";

interface Props {
  setEditDarkMode: (value: React.SetStateAction<boolean>) => void;
}

const EditDarkMode = ({ setEditDarkMode }: Props) => {
  const handleLightClick = () => {
    localStorage.colorScheme = "light";
    document.documentElement.classList.remove("dark");
    setEditDarkMode(false);
  };
  const handleDarkClick = () => {
    localStorage.colorScheme = "dark";
    document.documentElement.classList.add("dark");
    setEditDarkMode(false);
  };
  const handleSystemClick = () => {
    localStorage.removeItem("colorScheme");
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    setEditDarkMode(false);
  };
  return (
    <div className="mb-8">
      <span className="text-lg font-medium mr-4 lg:mr-12">Change Color Preference</span>
      <span>
        <Hyperlink to="#" handleClick={() => setEditDarkMode(false)}>
          Close
        </Hyperlink>
      </span>
      <div className="w-full lg:w-1/2 mt-4">
        <ColorSchemeButton handleClick={handleLightClick} text="Use Light Mode">
          <Sun styles="w-7 h-7 dark:text-gray-400" />
        </ColorSchemeButton>
        <ColorSchemeButton handleClick={handleDarkClick} text="Use Dark Mode">
          <Moon styles="w-7 h-7 dark:text-gray-400" />
        </ColorSchemeButton>
        <ColorSchemeButton handleClick={handleSystemClick} text="Use System Setting">
          <Cog styles="w-7 h-7 dark:text-gray-400" />
        </ColorSchemeButton>
      </div>
    </div>
  );
};

export default EditDarkMode;
