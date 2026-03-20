import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEye, FaArrowLeft, FaRegThumbsUp, FaThumbsUp, FaRegComment } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import useAuth from "../hooks/useAuth";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Comment states
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // Like state
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch news detail
  useEffect(() => {
    axiosInstance
      .get(`/news/${id}`)
      .then((res) => {
        setNews(res.data.news);
        setLikeCount(res.data.news.likes || 0);
        // Check if current user already liked
        if (user && res.data.news.likedBy?.includes(user.id)) {
          setLiked(true);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, user]);

  // Fetch comments for this news
  useEffect(() => {
    axiosInstance
      .get(`/comments/${id}`)
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.error(err));
  }, [id]);

  // Handle like toggle
  const handleLike = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    try {
      const res = await axiosInstance.post(`/news/${id}/like`);
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // Handle comment submit
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!user) {
      navigate("/auth/login");
      return;
    }

    setCommentLoading(true);
    try {
      await axiosInstance.post("/comments", {
        newsId: id,
        text: commentText,
      });

      // Refresh comments after posting
      const res = await axiosInstance.get(`/comments/${id}`);
      setComments(res.data.comments);
      setCommentText("");
    } catch (err) {
      console.error("Comment failed:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle comment delete
  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p className="text-lg font-semibold">News not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition"
      >
        <FaArrowLeft /> Back to News
      </button>

      {/* News Detail Card */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-base-200 dark:border-gray-700">

        {/* Author Info — first */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={news.author?.photo || "/default-avatar.png"}
            alt={news.author?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-red-300"
          />
          <div>
            <p className="text-sm font-semibold dark:text-white">{news.author?.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(news.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {/* Views — right side */}
          <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <FaRegEye />
            <span>{news.views} views</span>
          </div>
        </div>

        {/* Category badge */}
        <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded-full font-medium">
          {news.category}
        </span>

        {/* Title — after author */}
        <h1 className="text-2xl font-bold mt-3 mb-4 dark:text-white">
          {news.title}
        </h1>

        {/* Thumbnail */}
        {news.thumbnail && (
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full max-h-80 object-cover rounded-lg mb-6"
          />
        )}

        {/* Full Content */}
        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-6">
          {news.content}
        </div>

        {/* Like + Comment count bar */}
        <div className="flex items-center gap-4 py-3 border-t border-base-200 dark:border-gray-700">
          {/* Like button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition ${
              liked ? "text-red-500" : "text-gray-500 hover:text-red-400"
            }`}
          >
            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{likeCount} Likes</span>
          </button>

          {/* Comment count */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <FaRegComment />
            <span>{comments.length} Comments</span>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-base-200 dark:border-gray-700">
        <h3 className="font-bold text-base mb-4 dark:text-white flex items-center gap-2">
          <FaRegComment className="text-red-500" />
          Comments ({comments.length})
        </h3>

        {/* Comment Input */}
        {user ? (
          <form onSubmit={handleComment} className="flex gap-2 mb-6">
            <img
              src={user.photo || "/default-avatar.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 transition bg-transparent dark:text-white"
              />
              <button
                type="submit"
                disabled={commentLoading || !commentText.trim()}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-lg disabled:opacity-60"
              >
                {commentLoading ? "..." : "Post"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            <span
              onClick={() => navigate("/auth/login")}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Login
            </span>{" "}
            to write a comment
          </p>
        )}

        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <img
                  src={comment.author?.photo || "/default-avatar.png"}
                  alt={comment.author?.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-base-200 dark:bg-gray-700 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold dark:text-white mb-1">
                      {comment.author?.name}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {comment.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-1">
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {/* Delete button — only for comment author */}
                    {user && user.id === comment.author?.id?.toString() && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-xs text-red-400 hover:text-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default NewsDetail;