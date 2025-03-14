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
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/hr" element={<Navigate to="/hr/attendance" />} />
          {/* Redirect HR to Attendance */}
          <Route path="/hr/employees" element={<HrEmployees />} />
          <Route path="/hr/attendance" element={<HrDashboard />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
