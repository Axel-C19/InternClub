import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Guarda el token
        navigate("/main"); // Redirige al dashboard
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0F5572]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#0F5572]">Login</h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <div className="flex justify-center mb-6">
          <img
            src="\src\assets\clubInternLogo.png"
            alt="Intern Logo"
            className="w-20 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-[#0F5572]"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:border-[#0F5572] focus:ring-[#0F5572]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-1 text-[#0F5572]"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:border-[#0F5572] focus:ring-[#0F5572]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 px-2 text-[#0F5572]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-[#0F5572]"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#0F5572] hover:bg-[#0A4360] text-white font-medium py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-[#0F5572] hover:text-[#0A4360]"
          >
            Forgot Password?
          </a>
          <span className="mx-2 text-[#0F5572]">|</span>
          <a href="/signup" className="text-[#0F5572] hover:text-[#0A4360]">
            Signup here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
