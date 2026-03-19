import { createContext, useState } from "react";

// Global auth context — accessible from any component
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Stores logged-in user info
  const [user, setUser] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Register — TODO Part 2: connect to real backend
  const register = async (formData) => {
    // Temporarily store user from formData for UI testing
    const tempUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      photo: formData.get("photo")
        ? URL.createObjectURL(formData.get("photo"))
        : null,
    };
    setUser(tempUser);
    return tempUser;
  };

  // Login — TODO Part 2: connect to real backend
  const login = async (email, password) => {
    // Temporarily set a mock user for UI testing
    const tempUser = { name: "Test User", email, photo: null };
    setUser(tempUser);
    return tempUser;
  };

  // Logout — clear user state
  const logout = () => {
    setUser(null);
  };

  const value = { user, loading, register, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;