import { Link } from "react-router-dom";

interface HyperlinkProps {
  to: string;
  handleClick?: () => void;
  children: string;
}

const Hyperlink = ({ to, children, handleClick }: HyperlinkProps) => {
  return (
    <Link
      to={to}
      className="font-semibold text-blue-500 hover:text-blue-600 hover:underline underline-offset-2"
      onClick={handleClick}>
      {children}
    </Link>
  );
};

export default Hyperlink;
