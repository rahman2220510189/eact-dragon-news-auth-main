import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Error from "../pages/Error";
import CategoryNews from "../pages/CategoryNews";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/category/01" replace />,
      },
      {
        path: "category/:id",
        element: <CategoryNews />,
        loader: ({ params }) =>
          fetch(
            `https://openapi.programming-hero.com/api/news/category/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;