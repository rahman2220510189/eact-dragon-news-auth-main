import { NavLink } from "react-router-dom";
import { FaHome, FaBriefcase, FaInfoCircle, FaUser } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";

// Nav items list — easy to add/remove later
const navItems = [
  { to: "/", label: "Home", icon: <FaHome />, end: true },
  { to: "/about", label: "About", icon: <FaInfoCircle /> },
  { to: "/career", label: "Career", icon: <FaBriefcase /> },
  { to: "/fake-news-detector", label: "Fake News", icon: <FaShieldHalved /> },
  { to: "/auth/login", label: "Login", icon: <FaUser /> },
];

const MobileNav = () => {
  return (
    // Horizontal scrollable nav for small screens
    <div className="flex overflow-x-auto gap-1 px-3 py-2 scrollbar-hide">
      {navItems.map(({ to, label, icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition shrink-0 ${
              isActive
                ? "bg-red-500 text-white"
                : "bg-base-200 hover:bg-red-50 hover:text-red-500 dark:bg-gray-700 dark:text-gray-200"
            }`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;