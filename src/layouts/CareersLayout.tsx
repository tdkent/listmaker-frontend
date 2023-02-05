import { Outlet } from "react-router-dom";

const CareersLayout = () => {
  return (
    <div>
      <h2>Careers</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quis.
      </p>
      <Outlet />
    </div>
  );
};

export default CareersLayout;
