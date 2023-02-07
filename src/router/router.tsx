import { createBrowserRouter } from "react-router-dom";
import { useState } from "react";
// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home, { newListAction } from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import UserProfile from "../pages/user/UserProfile";
import UserLists from "../pages/user/UserLists";
import About from "../pages/about/About";
import RootError from "../pages/error/RootError";

// callbacks
// import { authUserAction } from "../components/auth/AuthenticateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: newListAction,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "my-lists",
        element: <UserLists />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);
