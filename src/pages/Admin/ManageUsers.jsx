import { useEffect, useState } from "react";
import { FaUserShield, FaUser, FaTrash } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users
    axiosInstance
      .get("/admin/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Toggle user role between admin and user
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await axiosInstance.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Role change failed:", err);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Manage Users ({users.length})
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {/* User info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.photo || "/default-avatar.png"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <span className="font-medium dark:text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                {/* Role badge */}
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {user.role}
                  </span>
                </td>
                {/* Action buttons */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Toggle admin role */}
                    <button
                      onClick={() => handleRoleChange(user._id, user.role)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition ${
                        user.role === "admin"
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                          : "bg-red-100 hover:bg-red-200 text-red-600"
                      }`}
                    >
                      {user.role === "admin" ? <FaUser /> : <FaUserShield />}
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                    {/* Delete user */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-1.5 text-red-400 hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;