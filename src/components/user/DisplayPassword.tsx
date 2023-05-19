import Hyperlink from "../forms/Hyperlink";

interface Props {
  setEditPassword: (value: React.SetStateAction<boolean>) => void;
}

const DisplayPassword = ({ setEditPassword }: Props) => {
  return (
    <div>
      <span className="text-lg font-medium mr-4">Password</span>
      <span>
        <Hyperlink to="#" handleClick={() => setEditPassword(true)}>
          Change
        </Hyperlink>
      </span>
      <p className="text-2xl">••••••</p>
    </div>
  );
};

export default DisplayPassword;
