import FindUs from "../FindUs";
import { NavLink } from "react-router-dom";
import { FaHome, FaBriefcase, FaInfoCircle, FaUser, FaUserCircle } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

const activeClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
    isActive
      ? "bg-red-500 text-white"
      : "bg-base-100 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-200"
  }`;

const RightNav = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-5 sticky top-4">

      {/* User info card — only shown when logged in */}
      {user && (
        <div className="flex items-center gap-3 p-3 bg-base-100 dark:bg-gray-800 rounded-lg border border-base-200 dark:border-gray-700">
          <img
            src={user.photo || "/default-avatar.png"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-red-300 shrink-0"
          />
          <div className="overflow-hidden">
            <p className="font-semibold text-sm truncate dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div>
        <h2 className="font-semibold mb-3 text-sm">Navigation</h2>
        <div className="flex flex-col gap-2">
          <NavLink to="/" end className={activeClass}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/about" className={activeClass}>
            <FaInfoCircle /> About
          </NavLink>
          <NavLink to="/career" className={activeClass}>
            <FaBriefcase /> Career
          </NavLink>
          <NavLink to="/fake-news-detector" className={activeClass}>
            <FaShieldHalved className="text-red-500" /> Fake News Detector
          </NavLink>

          {/* Profile + Logout or Login */}
          {user ? (
            <>
              <NavLink to="/profile" className={activeClass}>
                <FaUserCircle /> Profile
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium bg-base-100 hover:bg-red-50 hover:text-red-500 transition dark:bg-gray-800 dark:text-gray-200"
              >
                <FaUser /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth/login" className={activeClass}>
              <FaUser /> Login
            </NavLink>
          )}

        </div>
      </div>

      {/* Social Media Follow Links */}
      <FindUs />

    </div>
  );
};

export default RightNav;