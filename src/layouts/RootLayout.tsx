import { Outlet } from "react-router-dom";

import NavBar from "./nav/NavBar";

const RootLayout = (): JSX.Element => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
