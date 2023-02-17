import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import UserLists from "../pages/UserLists";
import EditList from "../pages/EditList";
import NewList from "../pages/NewList";
import NotFound from "../pages/NotFound";

// error elements
import RootError from "../pages/RootError";

// actions
import { createNewListAction } from "../functions/create-list-action";
import { registerUserAction } from "../functions/register-action";
import { loginUserAction } from "../functions/login-action";
import { profileEditAction } from "../functions/profile-edit-action";

// loaders
import { userListsLoader } from "../functions/user-lists-loader";
// import { editListLoader } from "../functions/edit-list-loader";
import { profileLoader } from "../functions/profile-loader";

export const routerNoAuth = createBrowserRouter([
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
            action: registerUserAction,
          },
          {
            path: "login",
            element: <Login />,
            action: loginUserAction,
          },
          {
            path: "new",
            element: <Navigate to="/login" />,
          },
          // {
          //   path: "lists",
          //   children: [
          //     {
          //       index: true,
          //       element: <Navigate to="/login" />,
          //     },
          //     {
          //       path: ":listName",
          //       element: <Navigate to="/login" />,
          //     },
          //   ],
          // },
          // {
          //   path: "profile",
          //   children: [
          //     {
          //       index: true,
          //       element: <Navigate to="/login" />,
          //     },
          //     {
          //       path: "edit",
          //       element: <Navigate to="/login" />,
          //     },
          //     {
          //       path: "*",
          //       element: <Navigate to="/login" />,
          //     },
          //   ],
          // },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export const routerAuth = createBrowserRouter([
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
            element: <Navigate to="/" />,
          },
          {
            path: "login",
            element: <Navigate to="/" />,
          },
          {
            path: "new",
            element: <NewList />,
            action: createNewListAction,
          },
          {
            path: "lists",
            children: [
              {
                index: true,
                element: <UserLists />,
                loader: userListsLoader,
              },
              {
                path: ":slug",
                element: <EditList />,
                // loader: editListLoader,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
                loader: profileLoader,
              },
              {
                path: "edit",
                element: <ProfileEdit />,
                loader: profileLoader,
                action: profileEditAction,
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
