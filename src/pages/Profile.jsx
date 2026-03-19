import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSpinner,
  FaNewspaper,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../utils/axiosInstance";
import uploadImage from "../utils/uploadImage";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Edit profile states
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  // News post states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postMsg, setPostMsg] = useState("");

  // User's posts
  const [myPosts, setMyPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Categories list
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  // Fetch user's own posts
  useEffect(() => {
    axiosInstance
      .get("/news/my-posts")
      .then((res) => setMyPosts(res.data.news))
      .catch((err) => console.error(err))
      .finally(() => setPostsLoading(false));
  }, []);

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg("");
    try {
      await updateProfile(name, photoFile);
      setProfileMsg("Profile updated successfully!");
      setEditMode(false);
      setPhotoFile(null);
    } catch (err) {
      setProfileMsg("Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Handle news post submission
  const handlePostNews = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    setPostMsg("");

    try {
      let thumbnailURL = "";

      // Upload thumbnail to ImgBB if provided
      if (thumbnail) {
        thumbnailURL = await uploadImage(thumbnail);
      }

      // Post news to backend
      await axiosInstance.post("/news", {
        title,
        content,
        category,
        thumbnail: thumbnailURL,
      });

      setPostMsg("News posted successfully! ✅");

      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setThumbnail(null);
      setThumbnailPreview("");

      // Refresh posts list
      const updated = await axiosInstance.get("/news/my-posts");
      setMyPosts(updated.data.news);
    } catch (err) {
      setPostMsg(err.response?.data?.message || "Failed to post news");
    } finally {
      setPostLoading(false);
    }
  };

  // Handle news delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    try {
      await axiosInstance.delete(`/news/${id}`);
      // Remove deleted post from local state
      setMyPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">

      {/* Profile Card */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-sm border border-base-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">

          {/* Profile Photo */}
          <div className="relative">
            <img
              src={photoPreview || user?.photo || "/default-avatar.png"}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-red-300"
            />
            {/* Camera button — only visible in edit mode */}
            {editMode && (
              <label
                htmlFor="profile-photo"
                className="absolute bottom-0 right-0 bg-red-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-600"
              >
                <FaCamera className="text-xs" />
              </label>
            )}
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold dark:text-white">{user?.name}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaEnvelope className="text-xs" /> {user?.email}
            </p>
            <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full mt-1 inline-block">
              {user?.role}
            </span>
          </div>

          {/* Edit + Logout buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-sm border border-red-300 text-red-500 hover:bg-red-50 bg-transparent rounded"
            >
              <FaEdit /> {editMode ? "Cancel" : "Edit"}
            </button>

            {/* Logout button — always visible especially useful on mobile */}
            <button
              onClick={handleLogout}
              className="btn btn-sm border border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-300 bg-transparent rounded"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {editMode && (
          <form
            onSubmit={handleProfileUpdate}
            className="space-y-3 border-t pt-4 dark:border-gray-700"
          >
            <div>
              <label className="text-sm font-medium dark:text-gray-300">
                Full Name
              </label>
              <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 focus-within:border-red-400 transition">
                <FaUser className="text-gray-400 text-xs" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-sm dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Success/Error message */}
            {profileMsg && (
              <p
                className={`text-sm ${
                  profileMsg.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {profileMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded"
            >
              {profileLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        )}
      </div>

      {/* Post News Form */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-sm border border-base-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
          <FaNewspaper className="text-red-500" />
          Post a News
        </h3>

        <form onSubmit={handlePostNews} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm font-medium dark:text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News headline..."
              required
              className="w-full border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:border-red-400 transition bg-transparent dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium dark:text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:border-red-400 transition bg-base-100 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium dark:text-gray-300">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your news content..."
              required
              rows={5}
              className="w-full border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:border-red-400 transition bg-transparent dark:text-white resize-none"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="text-sm font-medium dark:text-gray-300">
              Thumbnail (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 text-sm bg-transparent dark:text-white"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="mt-2 rounded-lg max-h-40 object-cover"
              />
            )}
          </div>

          {/* Post message */}
          {postMsg && (
            <p
              className={`text-sm ${
                postMsg.includes("✅") ? "text-green-500" : "text-red-500"
              }`}
            >
              {postMsg}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={postLoading}
            className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none rounded-lg disabled:opacity-60"
          >
            {postLoading ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Posting...
              </span>
            ) : (
              "Post News"
            )}
          </button>
        </form>
      </div>

      {/* My Posts List */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-sm border border-base-200 dark:border-gray-700 p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
          <FaNewspaper className="text-red-500" />
          My Posts ({myPosts.length})
        </h3>

        {/* Loading skeleton */}
        {postsLoading && (
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!postsLoading && myPosts.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">
            You haven't posted any news yet.
          </p>
        )}

        {/* Posts list */}
        <div className="flex flex-col gap-3">
          {myPosts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-3 p-3 border border-base-200 dark:border-gray-700 rounded-lg"
            >
              {/* Thumbnail or placeholder */}
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-14 h-14 rounded object-cover shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <FaNewspaper className="text-gray-400" />
                </div>
              )}

              {/* Post info */}
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-sm truncate dark:text-white">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500">{post.category}</p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-400 hover:text-red-600 transition p-2 shrink-0"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;