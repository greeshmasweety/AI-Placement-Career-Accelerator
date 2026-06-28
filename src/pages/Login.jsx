import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Uses the same "pai_users" key that Home.jsx's register/login
    // modals read and write, so an account created on either screen
    // works on both.
    const users = JSON.parse(localStorage.getItem("pai_users") || "[]");

    const validUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!validUser) {
      setError(
        users.length === 0
          ? "No account found. Please register first."
          : "Invalid email or password."
      );
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(validUser)
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-[400px] box-border">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4 box-border"
            value={email}
            required
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4 box-border"
            value={password}
            required
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}