import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach JWT token automatically to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // Debug: log token and header being attached for troubleshooting
  console.debug("[API] token from localStorage:", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.debug("[API] Authorization header set:", req.headers.Authorization);
  } else {
    console.debug("[API] No token available to attach");
  }
  return req;
});

export default API;
