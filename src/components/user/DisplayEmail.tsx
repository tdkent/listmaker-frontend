interface Props {
  userEmail: string;
}

const DisplayEmail = ({ userEmail }: Props) => {
  return (
    <div>
      <span className="text-lg font-medium mr-4">Email</span>
      <p className="truncate py-2">{userEmail}</p>
    </div>
  );
};

export default DisplayEmail;
