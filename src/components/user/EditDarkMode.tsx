import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import Cog from "../../icons/Cog";
import Hyperlink from "../forms/Hyperlink";

interface Props {
  setEditDarkMode: (value: React.SetStateAction<boolean>) => void;
}

const EditDarkMode = ({ setEditDarkMode }: Props) => {
  const handleLightClick = () => {
    localStorage.colorScheme = "light";
    document.body.classList.remove("dark");
    setEditDarkMode(false);
  };
  const handleDarkClick = () => {
    localStorage.colorScheme = "dark";
    document.body.classList.add("dark");
    setEditDarkMode(false);
  };
  const handleSystemClick = () => {
    localStorage.removeItem("colorScheme");
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
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
        <button type="button" onClick={handleLightClick} className="w-full">
          <div className="flex flex-row items-center px-2 py-3 hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <Sun styles="w-7 h-7" />
            <span className="ml-4">Use Light Mode</span>
          </div>
        </button>
        <button type="button" onClick={handleDarkClick} className="w-full">
          <div className="flex flex-row items-center px-2 py-3 hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <Moon styles="w-7 h-7" />
            <span className="ml-4">Use Dark Mode</span>
          </div>
        </button>
        <button type="button" onClick={handleSystemClick} className="w-full">
          <div className="flex flex-row items-center px-2 py-3 hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <Cog styles="w-7 h-7" />
            <span className="ml-4">Use System Setting</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditDarkMode;
