import { NavLink } from "react-router-dom";
import { FaHome, FaNewspaper, FaUser } from "react-icons/fa";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
      isActive
        ? "bg-red-500 text-white"
        : "text-gray-700 hover:bg-red-50 hover:text-red-500 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="flex flex-wrap gap-2 justify-center">
      <NavLink to="/" end className={linkClass}>
        <FaHome /> Home
      </NavLink>
      <NavLink to="/news" className={linkClass}>
        <FaNewspaper /> News
      </NavLink>
      <NavLink to="/auth" className={linkClass}>
        <FaUser /> Login
      </NavLink>
    </nav>
  );
};

export default Navbar;
