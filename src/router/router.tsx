import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <div>Home page content</div>,
      },
      {
        path: "auth",
        element: (
          <div>
            <p>Authentication form</p>
          </div>
        ),
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
