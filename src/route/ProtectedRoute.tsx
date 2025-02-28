import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore(); // Get user state from Zustand
  const location = useLocation(); // Get current route

  // Get bucket name from .env
  const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME || "";
  const isGoogleStorage = window.location.hostname === "storage.googleapis.com";

  // Define allowed paths per role
  const rolePaths: Record<string, string[]> = {
    employee: ["/employee"],
    hr: ["/hr/employees", "/hr/attendance"],
  };

  // Adjust base path if hosted on Google Storage
  const basePath = isGoogleStorage ? `/${BUCKET_NAME}` : "";
  const currentPath = location.pathname.replace(basePath, ""); // Remove bucket prefix if present

  // If user is NOT logged in, allow ONLY "/" access; otherwise, redirect to login
  if (!user) {
    return currentPath === "/" ? (
      <Outlet />
    ) : (
      <Navigate to={`${basePath}/`} replace />
    );
  }

  // If logged-in user is at "/" (home), redirect them to their first allowed route
  if (currentPath === "/") {
    return <Navigate to={`${basePath}${rolePaths[user.role][0]}`} replace />;
  }

  // Check if user is accessing a valid route for their role
  if (!rolePaths[user.role].includes(currentPath)) {
    return <Navigate to={`${basePath}${rolePaths[user.role][0]}`} replace />;
  }

  // If all checks pass, render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
