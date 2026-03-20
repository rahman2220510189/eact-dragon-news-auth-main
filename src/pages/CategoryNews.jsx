import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import axiosInstance from "../utils/axiosInstance";

const CategoryNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setLoading(true);
    setNews([]);

    // No id means home page — show all news
    if (!id) {
      axiosInstance
        .get("/news")
        .then((res) => {
          setNews(res.data.news);
          setTotal(res.data.total);
          setCategoryName("All News");
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
      return;
    }

    // Has id — get category name then fetch by category
    axiosInstance
      .get(`/categories/${id}`)
      .then((res) => {
        const name = res.data.category.name;
        setCategoryName(name);

        // All News — fetch without filter
        const url =
          name === "All News"
            ? "/news"
            : `/news?category=${encodeURIComponent(name)}`;
        return axiosInstance.get(url);
      })
      .then((res) => {
        setNews(res.data.news);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("News fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (news.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p className="text-lg font-semibold">No news found</p>
        <p className="text-sm">Be the first to post in this category!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold mb-2 dark:text-white">{categoryName}</h2>
      <p className="text-gray-400 text-sm mb-4">
        {total} news found
      </p>
      <div className="flex flex-col gap-4">
        {news.map((singleNews) => (
          <NewsCard key={singleNews._id} news={singleNews} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;