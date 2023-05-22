import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import Lists from "../pages/lists/Lists";
import List from "../pages/lists/List";
import NewList from "../pages/lists/NewList";
import NotFound from "../pages/errors/NotFound";
import RootError from "../pages/errors/RootError";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        errorElement: <RootError />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "new",
            element: <NewList />,
          },
          {
            path: "lists",
            children: [
              {
                index: true,
                element: <Lists />,
              },
              {
                path: ":slug",
                element: <List />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "*",
                element: <Navigate to="/profile" />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default router;
