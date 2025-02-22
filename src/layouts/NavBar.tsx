import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import Button from "../components/forms/Button";
import Close from "../icons/Close";

interface NavBarProps {
  showNav: boolean;
  setShowNav: (value: React.SetStateAction<boolean>) => void;
}

const NavBar = ({ showNav, setShowNav }: NavBarProps) => {
  const auth = useContext(AuthContext);
  const handleLogOut = () => {
    setShowNav(false);
    auth.logout();
  };
  return (
    <div
      className={`max-lg:transition-all max-lg:fixed max-lg:top-0 ${
        showNav
          ? "max-lg:left-0 max-lg:duration-1000"
          : "max-lg:left-full max-lg:duration-0"
      } max-lg:z-50 max-lg:bg-white max-lg:w-full max-lg:h-screen max-lg:p-4 max-lg:dark:bg-gray-900`}
    >
      <div className="flex">
        <Button
          text={
            <Close styles="w-7 h-7 stroke-gray-600 hover:stroke-gray-900 dark:stroke-gray-400 dark:hover:stroke-gray-300" />
          }
          type="button"
          handleClick={() => setShowNav(false)}
          divStyles="lg:hidden"
          arialabel="Close Mobile Nav"
        />
      </div>
      <nav className="max-lg:p-2 max-lg:my-4">
        <ul className="text-lg lg:flex lg:flex-row items-center lg:font-light">
          <li className="max-lg:py-4 max-lg:border-b dark:border-gray-600 lg:mr-6 lg:hover:text-blue-700 dark:hover:text-sky-500">
            <NavLink
              to="/"
              onClick={() => {
                setShowNav(false);
              }}
            >
              Home
            </NavLink>
          </li>
          {auth.isLoggedIn && (
            <>
              <li className="max-lg:py-4 max-lg:border-b dark:border-gray-600 lg:mr-6 lg:hover:text-blue-700 dark:hover:text-sky-500">
                <NavLink
                  to="/new"
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  New List
                </NavLink>
              </li>
              <li className="max-lg:py-4 max-lg:border-b dark:border-gray-600 lg:mr-6 lg:hover:text-blue-700 dark:hover:text-sky-500">
                <NavLink
                  to="lists"
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  My Lists
                </NavLink>
              </li>
              <li className="max-lg:py-4 max-lg:border-b dark:border-gray-600 lg:mr-6 lg:hover:text-blue-700 dark:hover:text-sky-500">
                <NavLink
                  to="profile"
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  Profile
                </NavLink>
              </li>
              <li className="max-lg:py-4 lg:mr-2 lg:hover:text-blue-700 dark:hover:text-sky-500">
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </>
          )}
          {!auth.isLoggedIn && (
            <>
              <li className="max-lg:py-4 max-lg:border-b dark:border-gray-600 lg:mr-6 lg:hover:text-blue-700 dark:hover:text-sky-500">
                <NavLink
                  to="login"
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  Log In
                </NavLink>
              </li>
              <li className="max-lg:py-4">
                <NavLink
                  to="register"
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  <span className="lg:rounded-md lg:px-4 lg:py-2 lg:text-white lg:bg-blue-600 lg:hover:bg-blue-700 dark:lg:bg-green-700 dark:lg:hover:bg-green-800">
                    Sign Up
                  </span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
