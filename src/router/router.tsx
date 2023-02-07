import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "../layouts/RootLayout";

// pages
import Home from "../pages/Home";
import Auth from "../pages/auth/Auth";

// callbacks
import { authUserAction } from "../components/auth/AuthenticateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: authUserAction,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "new-list",
        element: (
          <div>
            <p>New list form</p>
          </div>
        ),
      },
      {
        path: "my-lists",
        element: (
          <div>
            <p>List of lists</p>
          </div>
        ),
      },
      {
        path: "about",
        element: (
          <div>
            <p>About page</p>
          </div>
        ),
      },
    ],
  },
]);
