// Centralized router configuration
// All top-level routes live here so App stays clean

import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import DashboardPage from "../pages/DashboardPage";
import ActiveTestsPage from "../pages/ActiveTestsPage";
import DocumentationPage from "../pages/DocumentationPage";
import NotFoundPage from "../pages/NotFoundPage";
import ResearchJournalPage from "../pages/ResearchJournalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "experiments",
        element: <ActiveTestsPage />,
      },
      {
        path: "journal",
        element: <ResearchJournalPage />,
      },
      {
        path: "resources",
        element: <DocumentationPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);