import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Welcome message */}
        <div className="text-lg font-semibold text-gray-700">
          {user ? `Welcome, ${user.name}` : "Welcome"}
        </div>

        {/* Right: Navigation links */}
        {user && (
          <>
            <div className="hidden md:flex items-center gap-6">
              {user.role === "hr" && (
                <>
                  <Link
                    to="/hr/employees"
                    className="text-blue-600 hover:underline"
                  >
                    Manage Employees
                  </Link>
                  <Link
                    to="/hr/attendance"
                    className="text-blue-600 hover:underline"
                  >
                    View Attendance
                  </Link>
                </>
              )}
              <button onClick={logout} className="text-red-600 cursor-pointer hover:underline">
                Logout
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden cursor-pointer text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col items-center gap-4 py-4">
            {user.role === "hr" && (
              <>
                <li>
                  <Link
                    to="/hr/employees"
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Employees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hr/attendance"
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    View Attendance
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-600 cursor-pointer hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
