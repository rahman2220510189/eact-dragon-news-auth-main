import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <FaExclamationTriangle className="text-red-500 text-6xl" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-neutral rounded-none">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
