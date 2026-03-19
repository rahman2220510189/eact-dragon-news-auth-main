import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Error from "../pages/Error";
import CategoryNews from "../pages/CategoryNews";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";


const router = createBrowserRouter([
  {
    // Main portal layout with 3-column grid
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        // Default redirect to first category
        element: <Navigate to="/category/01" replace />,
      },
      {
        path: "category/:id",
        element: <CategoryNews  />,
        // TODO Part 3: replace loader with own backend call
        loader: ({ params }) =>
          fetch(
            `https://openapi.programming-hero.com/api/news/category/${params.id}`
          ),
      },
    ],
  },
  {
    // Auth pages — separate clean layout
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // Catch-all 404 page
    path: "*",
    element: <Error />,
  },
]);

export default router;