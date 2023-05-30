import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";
import Hyperlink from "../forms/Hyperlink";

interface Props {
  setEditPassword: (value: React.SetStateAction<boolean>) => void;
}

const DisplayPassword = ({ setEditPassword }: Props) => {
  const { active } = useContext(ErrorContext);
  return (
    <div>
      <span className="text-lg font-medium mr-4 lg:mr-12">Password</span>
      {active ? (
        <span className="text-gray-300">Change</span>
      ) : (
        <span>
          <Hyperlink to="#" handleClick={() => setEditPassword(true)}>
            Change
          </Hyperlink>
        </span>
      )}
      <p className="text-2xl">••••••</p>
    </div>
  );
};

export default DisplayPassword;
