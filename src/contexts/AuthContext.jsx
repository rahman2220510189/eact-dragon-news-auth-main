import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import uploadImage from "../utils/uploadImage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user with photo upload
  const register = async (formData) => {
    let photoURL = "";

    // Upload photo to ImgBB if provided
    const photoFile = formData.get("photo");
    if (photoFile && photoFile.size > 0) {
      photoURL = await uploadImage(photoFile);
    }

    // Send user data to our backend
    const res = await axiosInstance.post("/auth/register", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      photo: photoURL,
    });

    const { token, user } = res.data;
    // Save token to localStorage
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };

  // Login existing user
  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };

  // Logout — clear token and user state
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (name, photoFile) => {
    let photoURL = user.photo;

    // Upload new photo if provided
    if (photoFile) {
      photoURL = await uploadImage(photoFile);
    }

    const res = await axiosInstance.patch("/auth/update", {
      name,
      photo: photoURL,
    });

    // Update local user state
    setUser((prev) => ({ ...prev, name, photo: photoURL }));
    return res.data;
  };

  // On app load — verify token and restore user session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axiosInstance
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        // Token invalid — clear it
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const value = { user, loading, register, login, logout, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;