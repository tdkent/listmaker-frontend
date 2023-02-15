import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <h1>ListMaker</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/new">New</NavLink>
      {auth.isLoggedIn && (
        <>
          <NavLink to="lists">Lists</NavLink>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="profile">Log Out</NavLink>
        </>
      )}
      {!auth.isLoggedIn && <NavLink to="login">Login</NavLink>}
    </nav>
  );
};

export default NavBar;
