import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HrEmployees from "./pages/HREmployees";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import HrDashboard from "./pages/HRAttendance";

const App = () => {
  // Get bucket name from .env
  const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME || "";
  const isGoogleStorage = window.location.hostname === "storage.googleapis.com";

  // Adjust base path dynamically
  const basePath = isGoogleStorage ? `/${BUCKET_NAME}` : "";

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path={`${basePath}/`} element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path={`${basePath}/employee`}
            element={<EmployeeDashboard />}
          />
          <Route
            path={`${basePath}/hr`}
            element={<Navigate to={`${basePath}/hr/attendance`} replace />}
          />
          {/* Redirect HR to Attendance */}
          <Route path={`${basePath}/hr/employees`} element={<HrEmployees />} />
          <Route path={`${basePath}/hr/attendance`} element={<HrDashboard />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to={`${basePath}/`} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
