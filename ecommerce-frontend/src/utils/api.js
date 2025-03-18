import axios from "axios";

const API_BASE_URL = "https://onemg-1.onrender.com/"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle API requests
export const fetchProducts = async () => {
  try {
    const response = await api.get("/view-pro");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const createOrder = async (amount) => {
  try {
    const response = await api.post("/razor/createOrder", { amount });
    return response.data;
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
};

export default api;
