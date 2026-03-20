import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaNewspaper,
  FaTags,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: FaChartBar, end: true },
  { to: "/admin/users", label: "Users", icon: FaUsers },
  { to: "/admin/news", label: "News", icon: FaNewspaper },
  { to: "/admin/categories", label: "Categories", icon: FaTags },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 font-poppins">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">

        {/* Logo */}
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-lg font-bold text-red-400">Admin Panel</h1>
          <p className="text-xs text-gray-400 mt-1">{user?.name}</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom — Home + Logout */}
        <div className="p-4 border-t border-gray-700 flex flex-col gap-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition"
          >
            <FaHome /> Back to Site
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-red-500 hover:text-white transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;