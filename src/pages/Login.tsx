import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(DOMPurify.sanitize(username), DOMPurify.sanitize(password));
      alert("Login successful!");
    } catch (error) {
      alert("Failed to login" + error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(user.role === "employee" ? "/employee" : "/hr");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
