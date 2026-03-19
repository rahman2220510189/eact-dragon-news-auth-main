import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Custom hook — easy access to auth context anywhere
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default useAuth;