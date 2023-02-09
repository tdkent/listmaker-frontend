import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Profile from "../pages/user/Profile";
import MyLists from "../pages/user/MyLists";
import About from "../pages/about/About";

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
        path: "user-auth/register",
        element: <Register />,
        action: registerUserAction,
      },
      {
        path: "user-auth/login",
        element: <Login />,
        action: loginUserAction,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "my-lists/:userId",
        element: <MyLists />,
        loader: myListsLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
