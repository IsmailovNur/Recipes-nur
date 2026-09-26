import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { PostsPage } from "../pages/PostsPage/PostsPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <PostsPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />
      }
    ],
  },
]);
