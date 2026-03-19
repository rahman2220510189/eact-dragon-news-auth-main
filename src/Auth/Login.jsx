import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Login = () => {
  // Form field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previous page after login, or home by default
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900 px-4">
      <div className="bg-base-100 dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded px-4 py-2 mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-red-400 transition bg-transparent">
              <FaEnvelope className="text-gray-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                required
                className="flex-1 outline-none bg-transparent text-sm dark:text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-red-400 transition bg-transparent">
              <FaLock className="text-gray-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                required
                className="flex-1 outline-none bg-transparent text-sm dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none rounded-lg disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-red-500 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
