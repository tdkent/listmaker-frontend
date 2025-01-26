import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const Footer = () => {
  const auth = useContext(AuthContext);
  return (
    <footer
      id="footer"
      className="min-h-[120px] bg-blue-700 text-white text-sm font-light dark:bg-gray-900 dark:text-gray-300 mt-8"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center max-lg:w-full w-full lg:w-[1024px] mx-auto  py-6 lg:py-12 border-t border-transparent dark:border-gray-600">
        <div className="max-lg:mb-6 lg:mx-4 ">&copy; 2023 Tim Kent</div>
        <div>
          <ul className="flex flex-col lg:flex-row items-center">
            <li className="hover:underline max-lg:mb-6 lg:mx-6">
              <Link to="/">Home</Link>
            </li>
            {auth.isLoggedIn ? (
              <>
                <li className="hover:underline max-lg:mb-6 lg:mx-6">
                  <Link to="/new">New List</Link>
                </li>
                <li className="hover:underline max-lg:mb-6 lg:mx-6">
                  <Link to="/lists">My Lists</Link>
                </li>
                <li className="hover:underline max-lg:mb-6 lg:mx-6">
                  <Link to="/profile">My Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:underline max-lg:mb-6 lg:mx-6">
                  <Link to="/login">Log In</Link>
                </li>
                <li className="hover:underline max-lg:mb-6 lg:mx-6">
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
