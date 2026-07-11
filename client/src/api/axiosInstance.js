import axios from "axios";

/**
 * axiosInstance
 *
 * Pre-configured Axios instance used by ALL API modules.
 * Never call axios directly from components or services —
 * always import this instance so interceptors apply globally.
 *
 * Base URL reads from the Vite env variable:
 *   VITE_API_BASE_URL (defined in client/.env)
 * Falls back to localhost for local development.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000, // 30 seconds — generous for file uploads
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ────────────────────────────────────
// M-Auth: Attach Clerk session JWT to every request.
// window.Clerk is set globally by ClerkProvider when the app mounts.
// This pattern avoids needing React hooks inside a non-component file.
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // If Clerk is not yet ready (e.g. during SSR or pre-mount),
      // proceed without a token — the server will return 401.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ───────────────────────────────────
// Normalises error shapes from the server into a consistent
// format before reaching service/component code.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";

    // Return a uniform error object
    return Promise.reject({ message, status: error.response?.status });
  }
);

export default axiosInstance;
