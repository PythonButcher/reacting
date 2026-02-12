// Centralized router configuration
// All top-level routes live here so App stays clean

import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import ExperimentsPage from "../pages/ExperimentsPage";
import ArticlesPage from "../pages/Articles";

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
        path: "articles",
        element: <ArticlesPage />,
      }
    ],
  },
]);
