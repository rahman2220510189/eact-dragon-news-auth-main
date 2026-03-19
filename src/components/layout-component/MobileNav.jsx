import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBriefcase, FaInfoCircle, FaUser, FaTimes } from "react-icons/fa";
import { FaShieldHalved, FaBars } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import LeftNavbar from "./LeftNavbar";

const navItems = [
  { to: "/", label: "Home", icon: FaHome, end: true },
  { to: "/about", label: "About", icon: FaInfoCircle },
  { to: "/career", label: "Career", icon: FaBriefcase },
  { to: "/fake-news-detector", label: "AI Check", icon: FaShieldHalved },
  { to: "/auth/login", label: "Login", icon: FaUser },
];

const MobileNav = () => {
  // Controls category drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-around px-2 py-1">

          {/* Category Drawer Toggle Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 transition"
          >
            <FaNewspaper className="text-lg" />
            <span className="text-[10px] font-medium">Categories</span>
          </button>

          {/* Regular Nav Links */}
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "text-red-500"
                    : "text-gray-500 hover:text-red-400"
                }`
              }
            >
              <Icon className="text-lg" />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}

        </div>
      </div>

      {/* Category Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Category Drawer — slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-base-100 dark:bg-gray-900 rounded-t-2xl shadow-xl transition-transform duration-300 ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {/* Drawer Header */}
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

        {/* Category List — reuses existing LeftNavbar component */}
        <div className="p-4" onClick={() => setDrawerOpen(false)}>
          <LeftNavbar />
        </div>
      </div>
    </>
  );
};

export default MobileNav;