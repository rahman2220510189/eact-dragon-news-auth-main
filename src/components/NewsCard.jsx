import { FaShareAlt, FaRegEye } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-sm border border-base-200 dark:bg-gray-800 dark:border-gray-700">

      {/* Author Info */}
      <div className="flex items-center mb-4">
        <img
          src={news.author?.photo || "/default-avatar.png"}
          alt={news.author?.name}
          className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
        />
        <div>
          <p className="font-semibold text-sm">{news.author?.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(news.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Share icon */}
        <div className="ml-auto cursor-pointer hover:text-red-500 transition">
          <FaShareAlt className="text-gray-400" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2 dark:text-white">
        {news.title}
      </h2>

      {/* Thumbnail */}
      {news.thumbnail && (
        <img
          src={news.thumbnail}
          alt="Thumbnail"
          className="w-full object-cover rounded-lg mb-4 max-h-52"
        />
      )}

      {/* Content preview */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {news.content?.slice(0, 150)}...{" "}
        <Link
          to={`/news/${news._id}`}
          className="text-red-500 hover:underline font-medium"
        >
          Read More
        </Link>
      </p>

      {/* Category + Views */}
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <span className="bg-red-50 text-red-500 px-2 py-1 rounded-full font-medium">
          {news.category}
        </span>
        <div className="flex items-center gap-1">
          <FaRegEye />
          <span>{news.views || 0} views</span>
        </div>
      </div>

    </div>
  );
};

export default NewsCard;