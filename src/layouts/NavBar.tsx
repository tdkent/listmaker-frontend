import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/new">New List</NavLink>
        </li>
        {auth.isLoggedIn && (
          <>
            <li>
              <NavLink to="lists">My Lists</NavLink>
            </li>
            <li>
              <NavLink to="profile">Profile</NavLink>
            </li>
            <li>
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
  );
};

export default NavBar;
