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
  return (
    <div
      className={`transition-all duration-1000 fixed top-0 ${
        showNav ? "left-0" : "left-full"
      } z-100 bg-white w-full h-screen p-4`}>
      <div className="flex">
        <Button text={<Close />} type="button" handleClick={() => setShowNav(false)} />
      </div>

      <nav className="p-2 my-4">
        <ul className="text-lg">
          <li className="py-4 border-b">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="py-4 border-b">
            <NavLink to="/new">New List</NavLink>
          </li>
          {auth.isLoggedIn && (
            <>
              <li className="py-4 border-b">
                <NavLink to="lists">My Lists</NavLink>
              </li>
              <li className="py-4 border-b">
                <NavLink to="profile">Profile</NavLink>
              </li>
              <li className="py-4">
                <button onClick={auth.logout}>Log Out</button>
              </li>
            </>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
