import { NavLink, Outlet } from "react-router-dom";

const HelpLayout = () => {
  return (
    <div>
      <h2>Help Page</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, cum!
      </p>
      <nav>
        <NavLink to="faq">FAQ</NavLink>
        <NavLink to="contact">Contact</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default HelpLayout;
