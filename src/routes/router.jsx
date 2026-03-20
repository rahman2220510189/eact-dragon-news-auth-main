import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../Auth/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "../routes/AdminRoute";
import CategoryNews from "../pages/CategoryNews";
import NewsDetail from "../pages/NewsDetail";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../pages/Profile";
import Error from "../pages/Error";
import Dashboard from "../pages/Admin/Dashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageNews from "../pages/Admin/ManageNews";
import ManageCategories from "../pages/Admin/ManageCategories";
import Ai from "../pages/Ai";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        // Default — show all news without category filter
        element: <CategoryNews />,
      },
      {
        path: "category/:id",
        element: <CategoryNews />,
      },
      {
        path: "news/:id",
        element: <NewsDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "fake-news-detector",
        element: <Ai />,
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
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "news", element: <ManageNews /> },
      { path: "categories", element: <ManageCategories /> },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;