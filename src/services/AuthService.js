import axios from "axios";

const API_URL = "https://localhost:7248/api/auth"; // API URL'ini kendi projenize göre ayarlayın

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;

    // Token'ı localStorage'a kaydedin
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const logout = () => {
  // Token'ı localStorage'dan kaldırın
  localStorage.removeItem("token");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Token'ı yerel depolamada kontrol edin
  return token !== null;
};

const getToken = () => {
  return localStorage.getItem("token");
};

const AuthService = {
  login,
  logout,
  getToken,
  isAuthenticated,
};

export default AuthService;
