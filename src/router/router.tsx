import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Profile from "../pages/user/Profile";
import MyLists from "../pages/user/MyLists";
import NotFound from "../pages/NotFound";

// error elements
import RootError from "../pages/error/RootError";

// actions
import { createNewListAction } from "../utils/router-actions/createNewListAction";
import { registerUserAction } from "../components/auth/actions/register-user-act";
import { loginUserAction } from "../components/auth/actions/login-user-act";

// loaders
import { myListsLoader } from "../components/user/loaders/my-lists-loader";

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
