import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";
import Hyperlink from "../forms/Hyperlink";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import Cog from "../../icons/Cog";

interface Props {
  setEditDarkMode: (value: React.SetStateAction<boolean>) => void;
}

const DisplayDarkMode = ({ setEditDarkMode }: Props) => {
  const { active } = useContext(ErrorContext);
  return (
    <div>
      <span className="text-lg font-medium mr-4 lg:mr-12">Color Preference</span>
      {active ? (
        <span>Change</span>
      ) : (
        <span>
          <Hyperlink to="#" handleClick={() => setEditDarkMode(true)}>
            Change
          </Hyperlink>
        </span>
      )}
      <div>
        {!localStorage.colorScheme ? (
          <div className="flex flex-row items-center py-3">
            <Cog styles="w-7 h-7" />
            <span className="ml-4">System Settings</span>
          </div>
        ) : localStorage.colorScheme === "light" ? (
          <div className="flex flex-row items-center py-3">
            <Sun styles="w-7 h-7" />
            <span className="ml-4">Light Mode</span>
          </div>
        ) : (
          <div className="flex flex-row items-center py-3">
            <Moon styles="w-7 h-7" />
            <span className="ml-4">Dark Mode</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayDarkMode;
