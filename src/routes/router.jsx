import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../Auth/AuthLayout";
import CategoryNews from "../pages/CategoryNews";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Error from "../pages/Error";
import Profile from "../pages/Profile";

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
        // No loader — data fetched inside component
        path: "category/:id",
        element: <CategoryNews />,
      },
      {
  path: "profile",
  element: <Profile />,
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