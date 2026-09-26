import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes.ts";
import { MainLayout } from "../pages/MainLayout/MainLayout.tsx";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage.tsx";
import { LoginPage } from "../pages/LoginPage/LoginPage.tsx";
import RecipePage from "../pages/RecipePage/RecipePage.tsx";
import UserPage from "../pages/UserPage/UserPage.tsx";
import NewRecipePage from "../pages/NewRecipePage/NewRecipePage.tsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.tsx";

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
        path: "/recipes/:id",
        element: <RecipePage />,
      },

      {
        path: "/users/:id",
        element: <UserPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: AppRoutes.newRecipe,
            element: <NewRecipePage />,
          },
        ],
      },

      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />,
      }
    ],
  },
]);