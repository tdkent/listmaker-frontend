interface SuccessToastProps {
  msg: string;
}

const SuccessToast = ({ msg }: SuccessToastProps) => {
  return (
    <div>
      <p>{msg}</p>
    </div>
  );
};

export default SuccessToast;
