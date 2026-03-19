import { Outlet } from "react-router-dom";

// Clean centered layout for Login/Register pages
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
