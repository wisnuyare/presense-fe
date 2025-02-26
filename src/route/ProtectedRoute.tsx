import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore(); // Get user state from Zustand
  const location = useLocation(); // Get current route

  // Define allowed paths per role
  const rolePaths: Record<string, string[]> = {
    employee: ["/employee"],
    hr: ["/hr/employees", "/hr/attendance"],
  };

  // If user is NOT logged in, allow ONLY "/" access; otherwise, redirect to login
  if (!user) {
    return location.pathname === "/" ? <Outlet /> : <Navigate to="/" replace />;
  }

  // If logged-in user is at "/" (home), redirect them to their first allowed route
  if (location.pathname === "/") {
    return <Navigate to={rolePaths[user.role][0]} replace />;
  }

  // Check if user is accessing a valid route for their role
  if (!rolePaths[user.role].includes(location.pathname)) {
    return <Navigate to={rolePaths[user.role][0]} replace />;
  }

  // If all checks pass, render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
