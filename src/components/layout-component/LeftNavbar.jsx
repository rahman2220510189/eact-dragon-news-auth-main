import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";

const LeftNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO Part 3: replace with own backend → axiosInstance.get("/categories")
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.news_category);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
            <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <NavLink
            key={category.category_id}
            to={`/category/${category.category_id}`}
            className={({ isActive }) =>
              `btn border-none text-left justify-start ${
                isActive
                  ? "bg-red-500 text-white"  // active category highlighted
                  : "bg-base-100 hover:bg-red-50 hover:text-red-500"
              }`
            }
          >
            {category.category_name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;