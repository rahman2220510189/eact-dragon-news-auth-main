import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Protects admin routes — redirects non-admins to home
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth check is complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in but not admin — redirect to home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin — allow access
  return children;
};

export default AdminRoute;