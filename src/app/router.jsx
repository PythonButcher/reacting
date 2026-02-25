// Centralized router configuration
// All top-level routes live here so App stays clean

import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import ExperimentsPage from "../pages/ExperimentsPage";
import ResourcePage from "../pages/Resources";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      
      },
      {
        path: "experiments",
        element: <ExperimentsPage />,

      },
      {
        path: "resources",
        element: <ResourcePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);
