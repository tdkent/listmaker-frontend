import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";
import Hyperlink from "../forms/Hyperlink";

interface Props {
  setEditDarkMode: (value: React.SetStateAction<boolean>) => void;
}

const DisplayDarkMode = ({ setEditDarkMode }: Props) => {
  const { active } = useContext(ErrorContext);
  return (
    <div>
      <span className="text-lg font-medium mr-4 lg:mr-12">Dark Mode</span>
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
        <p>Light</p>
      </div>
    </div>
  );
};

export default DisplayDarkMode;
