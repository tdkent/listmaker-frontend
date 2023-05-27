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
      className={`transition-all fixed top-0 ${
        showNav ? "left-0 duration-1000" : "left-full duration-0"
      } z-50 bg-white w-full h-screen p-4`}>
      <div className="flex">
        <Button
          text={<Close styles="w-7 h-7 stroke-gray-600 hover:stroke-gray-900" />}
          type="button"
          handleClick={() => setShowNav(false)}
        />
      </div>

      <nav className="p-2 my-4">
        <ul className="text-lg">
          <li className="py-4 border-b">
            <NavLink
              to="/"
              onClick={() => {
                setShowNav(false);
              }}>
              Home
            </NavLink>
          </li>
          {auth.isLoggedIn && (
            <>
              <li className="py-4 border-b">
                <NavLink
                  to="/new"
                  onClick={() => {
                    setShowNav(false);
                  }}>
                  New List
                </NavLink>
              </li>
              <li className="py-4 border-b">
                <NavLink
                  to="lists"
                  onClick={() => {
                    setShowNav(false);
                  }}>
                  My Lists
                </NavLink>
              </li>
              <li className="py-4 border-b">
                <NavLink
                  to="profile"
                  onClick={() => {
                    setShowNav(false);
                  }}>
                  Profile
                </NavLink>
              </li>
              <li className="py-4">
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </>
          )}
          {!auth.isLoggedIn && (
            <>
              <li className="py-4 border-b">
                <NavLink
                  to="login"
                  onClick={() => {
                    setShowNav(false);
                  }}>
                  Log In
                </NavLink>
              </li>
              <li className="py-4 lg:mt-2">
                <NavLink
                  to="register"
                  onClick={() => {
                    setShowNav(false);
                  }}>
                  <span className="lg:rounded-md lg:px-4 lg:py-2 lg:text-white lg:bg-blue-500 lg:hover:bg-blue-600">
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
