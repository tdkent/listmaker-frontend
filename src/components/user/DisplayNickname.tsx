import Hyperlink from "../forms/Hyperlink";

interface Props {
  userNickname: string;
  setEditNickname: (value: React.SetStateAction<boolean>) => void;
}

const DisplayNickname = ({ userNickname, setEditNickname }: Props) => {
  return (
    <div>
      <span className="text-lg font-medium mr-4">Nickname</span>
      <span>
        <Hyperlink to="#" handleClick={() => setEditNickname(true)}>
          Change
        </Hyperlink>
      </span>
      {userNickname ? <p>{userNickname}</p> : <p className="italic">None</p>}
    </div>
  );
};

export default DisplayNickname;
