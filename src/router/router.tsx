import { createBrowserRouter } from "react-router-dom";

import HelpLayout from "../layouts/HelpLayout";
import RootLayout from "../layouts/RootLayout";
import CareersLayout from "../layouts/CareersLayout";

import About from "../pages/About";
import Careers from "../pages/careers/Careers";
import FAQ from "../pages/help/FAQ";
import Contact from "../pages/help/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help",
        element: <HelpLayout />,
        children: [
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: "careers",
        element: <CareersLayout />,
        children: [
          {
            path: "",
            element: <Careers />,
            loader: async () => {
              return fetch(`http://localhost:4000/careers`);
            },
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
