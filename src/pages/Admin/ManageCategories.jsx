import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Add new category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res = await axiosInstance.post("/categories", { name: newCategory });
      setCategories((prev) => [...prev, { _id: res.data.id, name: newCategory }]);
      setNewCategory("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axiosInstance.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Manage Categories ({categories.length})
      </h1>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium disabled:opacity-60"
        >
          <FaPlus /> Add
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Categories List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-4 flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <span className="text-sm font-medium dark:text-white">{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="p-1.5 text-red-400 hover:text-red-600 transition"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;