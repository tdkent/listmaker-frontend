import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const RootLayout = (): JSX.Element => {
  return (
    <div>
      <header>
        <h1 className="text-6xl">ListMaker</h1>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
