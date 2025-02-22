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
      className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 dark:text-green-500"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default Hyperlink;
