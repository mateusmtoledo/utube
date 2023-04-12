import axios from "axios";

let baseURL;

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  baseURL = "https://utube.mateustoledo.com/api";
} else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
  baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
} else if (process.env.NEXT_PUBLIC_API_URL) {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
} else {
  baseURL = "http://localhost:3000/api";
}

const api = axios.create({
  withCredentials: true,
  baseURL,
});

export default api;
