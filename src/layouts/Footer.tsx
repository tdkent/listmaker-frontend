import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const Footer = () => {
  const auth = useContext(AuthContext);
  return (
    <footer
      id="footer"
      className="min-h-[192px] py-6 bg-blue-600 text-white text-sm dark:bg-sky-900 dark:text-gray-300">
      <nav id="footer-navigation-bar" className="flex flex-col items-center">
        <span className="mb-3 hover:underline">
          <Link to="/">Home</Link>
        </span>
        {auth.isLoggedIn ? (
          <>
            <span className="mb-3 hover:underline">
              <Link to="/new">New List</Link>
            </span>
            <span className="mb-3 hover:underline">
              <Link to="/lists">My Lists</Link>
            </span>
            <span className="mb-3 hover:underline">
              <Link to="/profile">My Profile</Link>
            </span>
          </>
        ) : (
          <>
            <span className="mb-3 hover:underline">
              <Link to="/login">Login</Link>
            </span>
            <span className="mb-3 hover:underline">
              <Link to="/register">Sign Up</Link>
            </span>
          </>
        )}
      </nav>
      <p className="mt-4 text-center text-xs">ListMaker © 2023 Tim Kent</p>
    </footer>
  );
};

export default Footer;
