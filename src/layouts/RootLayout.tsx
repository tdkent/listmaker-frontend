import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

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
