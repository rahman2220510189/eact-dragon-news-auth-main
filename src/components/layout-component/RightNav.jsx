import FindUs from "../FindUs";
// import FakeNewsDetector from "./FakeNewsDetector";
import {  NavLink } from "react-router-dom";
import { FaHome, FaBriefcase, FaInfoCircle, FaUser } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
// Active/inactive style for nav links
const activeClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
    isActive
      ? "bg-red-500 text-white"
      : "bg-base-100 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-200"
  }`;
const RightNav = () => {
  return (
    <div className="space-y-5 sticky top-4">
      {/* Navigation Links — moved from top Navbar to here */}
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
          <NavLink to="/login" className={activeClass}>
            <FaUser /> Login
          </NavLink>
        </div>
      </div>
    
      {/* AI Fake News Detector Widget */}
      {/* <FakeNewsDetector /> */}
      {/* Social Media Follow Links */}
      <FindUs />
    </div>
  );
};
export default RightNav;