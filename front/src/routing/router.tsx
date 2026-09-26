import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage.tsx";
import { LoginPage } from "../pages/LoginPage/LoginPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <MainPage />,
      },
      {
        path: AppRoutes.register,
        element: <RegisterPage />,
      },
      {
        path: AppRoutes.login,
        element: <LoginPage />,
      },


      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />
      }
    ],
  },
]);
