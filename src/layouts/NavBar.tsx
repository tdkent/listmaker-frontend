import { NavLink } from "react-router-dom";

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <h1>ListMaker</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/new">New</NavLink>
      <NavLink to="lists">Lists</NavLink>
      <NavLink to="profile">Profile</NavLink>
      <NavLink to="login">Login</NavLink>
    </nav>
  );
};

export default NavBar;
