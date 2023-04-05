import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/";

const api = axios.create({
  withCredentials: true,
  baseURL,
});

export default api;
