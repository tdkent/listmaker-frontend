import { NavLink } from "react-router-dom";

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <h1>ListMaker</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="my-lists/1">My Lists</NavLink>
      <NavLink to="my-profile">Profile</NavLink>
      <NavLink to="user-auth/login">Login</NavLink>
      <NavLink to="about">About</NavLink>
    </nav>
  );
};

export default NavBar;
