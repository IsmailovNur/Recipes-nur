import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <MainPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />
      }
    ],
  },
]);
