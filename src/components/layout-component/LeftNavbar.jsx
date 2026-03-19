import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const LeftNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from our own backend
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Category fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sticky top-4">
      <h2 className="font-semibold mb-3 flex items-center gap-2">
        <FaNewspaper className="text-red-500" />
        All Categories
        <span className="text-xs text-gray-400">({categories.length})</span>
      </h2>

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <NavLink
            key={category._id}
            to={`/category/${category._id}`}
            className={({ isActive }) =>
              `btn border-none text-left justify-start ${
                isActive
                  ? "bg-red-500 text-white"
                  : "bg-base-100 hover:bg-red-50 hover:text-red-500"
              }`
            }
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;