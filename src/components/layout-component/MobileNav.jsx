import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaInfoCircle,
  FaUser,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import LeftNavbar from "./LeftNavbar";
import useAuth from "../../hooks/useAuth";

const MobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition ${
      isActive ? "text-red-500" : "text-gray-500 hover:text-red-400"
    }`;

  return (
    <>
      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-around px-2 py-1">

          {/* Categories Drawer Toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 transition"
          >
            <FaNewspaper className="text-lg" />
            <span className="text-[10px] font-medium">Categories</span>
          </button>

          {/* Home */}
          <NavLink to="/" end className={linkClass}>
            <FaHome className="text-lg" />
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>

          {/* About */}
          <NavLink to="/about" className={linkClass}>
            <FaInfoCircle className="text-lg" />
            <span className="text-[10px] font-medium">About</span>
          </NavLink>

          {/* AI Check */}
          <NavLink to="/fake-news-detector" className={linkClass}>
            <FaShieldHalved className="text-lg" />
            <span className="text-[10px] font-medium">AI Check</span>
          </NavLink>

          {/* Admin Panel — only for admins */}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              <FaUserShield className="text-lg" />
              <span className="text-[10px] font-medium">Admin</span>
            </NavLink>
          )}

          {/* Profile or Login */}
          {user ? (
            <NavLink to="/profile" className={linkClass}>
              <img
                src={user.photo || "/default-avatar.png"}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover border border-gray-300"
              />
              <span className="text-[10px] font-medium">Profile</span>
            </NavLink>
          ) : (
            <NavLink to="/auth/login" className={linkClass}>
              <FaUser className="text-lg" />
              <span className="text-[10px] font-medium">Login</span>
            </NavLink>
          )}

        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Category Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-base-100 dark:bg-gray-900 rounded-t-2xl shadow-xl transition-transform duration-300 ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200 dark:border-gray-700">
          <h2 className="font-semibold text-base flex items-center gap-2">
            <FaNewspaper className="text-red-500" />
            News Categories
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        <div className="p-4" onClick={() => setDrawerOpen(false)}>
          <LeftNavbar />
        </div>
      </div>
    </>
  );
};

export default MobileNav;