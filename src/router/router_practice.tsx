import { createBrowserRouter, json } from "react-router-dom";

import HelpLayout from "../layouts/HelpLayout";
import RootLayout from "../layouts/RootLayout";
import CareersLayout from "../layouts/CareersLayout";

import About from "../pages/About";
import Careers from "../pages/careers/Careers";
import FAQ from "../pages/help/FAQ";
import Contact from "../pages/help/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import CareerDetails, {
  careerDetailsLoader,
} from "../pages/careers/CareerDetails";
import CareersDetailsError from "../pages/careers/CareersDetailsError";

import { contactAction } from "../pages/help/Contact";

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
            action: contactAction,
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
              const response = await fetch("http://localhost:4000/careers");
              if (!response.ok) {
                throw json(
                  {
                    message:
                      "There was an error connecting to the remote server. It may be experiencing an outage, or there may be an error with the fetch request.",
                  },
                  { status: 404 }
                );
              }
              return response;
            },
          },
          {
            path: ":id",
            element: <CareerDetails />,
            loader: careerDetailsLoader,
          },
        ],
        errorElement: <CareersDetailsError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
