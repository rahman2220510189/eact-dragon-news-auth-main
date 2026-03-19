import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaSpinner, FaCamera } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Register = () => {
  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile photo states
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Handle photo selection and show preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setPhoto(file);
    // Generate local preview URL
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Password strength check
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Build FormData for multipart upload (supports photo)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (photo) formData.append("photo", photo);

      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
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
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join us today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="relative w-20 h-20">
              {/* Photo preview or placeholder */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-300 overflow-hidden bg-base-200 dark:bg-gray-700 flex items-center justify-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-400 text-2xl" />
                )}
              </div>

              {/* Camera icon overlay — triggers file input */}
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-red-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-600 transition"
              >
                <FaCamera className="text-xs" />
              </label>
            </div>

            {/* Hidden file input */}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <span className="text-xs text-gray-400">
              {photo ? photo.name : "Upload profile photo (optional)"}
            </span>
          </div>

          {/* Name Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Full Name
            </label>
            <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-red-400 transition">
              <FaUser className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="flex-1 outline-none bg-transparent text-sm dark:text-white"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-red-400 transition">
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
            <div className="flex items-center gap-2 border border-base-200 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:border-red-400 transition">
              <FaLock className="text-gray-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-red-500 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
