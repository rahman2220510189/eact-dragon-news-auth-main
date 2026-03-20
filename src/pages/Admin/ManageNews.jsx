import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Fetch all news for admin
    axiosInstance
      .get("/admin/news")
      .then((res) => setNews(res.data.news))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Start editing a news item
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({ title: item.title, category: item.category, content: item.content });
  };

  // Save edited news
  const saveEdit = async (id) => {
    try {
      await axiosInstance.patch(`/admin/news/${id}`, editData);
      setNews((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...editData } : n))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  // Delete any news as admin
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    try {
      await axiosInstance.delete(`/admin/news/${id}`);
      setNews((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Manage News ({news.length})
      </h1>

      <div className="flex flex-col gap-3">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            {editingId === item._id ? (
              // Edit mode
              <div className="flex flex-col gap-2">
                <input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm outline-none focus:border-red-400 bg-transparent dark:text-white"
                />
                <input
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm outline-none focus:border-red-400 bg-transparent dark:text-white"
                />
                <textarea
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  rows={3}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm outline-none focus:border-red-400 bg-transparent dark:text-white resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(item._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                  >
                    <FaCheck /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div className="flex items-center gap-3">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 rounded object-cover shrink-0"
                  />
                )}
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-sm truncate dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <p className="text-xs text-gray-400">By {item.author?.name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-1.5 text-blue-400 hover:text-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-red-400 hover:text-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNews;