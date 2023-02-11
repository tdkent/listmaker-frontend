import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import MyLists from "../pages/MyLists";
import NotFound from "../pages/NotFound";

// error elements
import RootError from "../pages/RootError";

// actions
import { createNewListAction } from "../functions/create-list-action";
import { registerUserAction } from "../functions/register-action";
import { loginUserAction } from "../functions/login-action";

// loaders
import { myListsLoader } from "../functions/my-lists-loader";

export const router = createBrowserRouter([
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
            action: createNewListAction,
          },
          {
            path: "register",
            element: <Register />,
            action: registerUserAction,
          },
          {
            path: "login",
            element: <Login />,
            action: loginUserAction,
          },
          {
            path: "new",
            element: <h1>Creating a new List</h1>,
          },
          {
            path: "lists",
            children: [
              {
                index: true,
                element: <h2>Display user's lists</h2>,
              },
              {
                path: ":listName",
                element: <h2>User interacts with list</h2>,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: (
                  <div>
                    <h2>User's profile page</h2>
                    <Outlet />
                  </div>
                ),
              },
              {
                path: "edit",
                element: <h2>User edits profile here</h2>,
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
