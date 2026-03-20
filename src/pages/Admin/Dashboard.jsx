import { useEffect, useState } from "react";
import { FaUsers, FaNewspaper, FaComments, FaTags } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

// Stat card component
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold dark:text-white">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard statistics from admin API
    axiosInstance
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaUsers} label="Total Users" value={stats?.totalUsers} color="bg-blue-500" />
        <StatCard icon={FaNewspaper} label="Total News" value={stats?.totalNews} color="bg-red-500" />
        <StatCard icon={FaComments} label="Total Comments" value={stats?.totalComments} color="bg-green-500" />
        <StatCard icon={FaTags} label="Categories" value={stats?.totalCategories} color="bg-yellow-500" />
      </div>
    </div>
  );
};

export default Dashboard;