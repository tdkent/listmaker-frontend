import { useContext } from "react";

import ErrorContext from "../../context/ErrorContext";
import Hyperlink from "../forms/Hyperlink";

interface Props {
  userNickname: string;
  setEditNickname: (value: React.SetStateAction<boolean>) => void;
}

const DisplayNickname = ({ userNickname, setEditNickname }: Props) => {
  const { active } = useContext(ErrorContext);
  return (
    <div>
      <span className="text-lg font-medium mr-4 lg:mr-12">Nickname</span>
      {active ? (
        <span className="text-gray-300">Change</span>
      ) : (
        <span>
          <Hyperlink to="#" handleClick={() => setEditNickname(true)}>
            Change
          </Hyperlink>
        </span>
      )}
      {userNickname ? <p className="py-2">{userNickname}</p> : <p className="italic py-2">None</p>}
    </div>
  );
};

export default DisplayNickname;
