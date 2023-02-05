import { NavLink } from "react-router-dom";

const NavBar = (): JSX.Element => {
  return (
    <nav>
      <h1>ListMaker</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="help">Help</NavLink>
      <NavLink to="careers">Careers</NavLink>
    </nav>
  );
};

export default NavBar;
