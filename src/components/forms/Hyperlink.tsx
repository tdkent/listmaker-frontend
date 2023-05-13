import { Link } from "react-router-dom";

interface HyperlinkProps {
  to: string;
  children: string;
}

const Hyperlink = ({ to, children }: HyperlinkProps) => {
  return (
    <Link to={to} className="font-semibold text-azure hover:underline underline-offset-2">
      {children}
    </Link>
  );
};

export default Hyperlink;
