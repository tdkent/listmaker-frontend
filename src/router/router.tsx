import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import UserProfile from "../pages/user/UserProfile";
import UserLists from "../pages/user/UserLists";
import About from "../pages/about/About";
import RootError from "../pages/error/RootError";

// callbacks
// import { authUserAction } from "../components/auth/AuthenticateUser";
import { createNewListAction } from "../utils/router-actions/createNewListAction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: createNewListAction,
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
