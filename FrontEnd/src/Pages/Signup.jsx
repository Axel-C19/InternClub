import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/signup", {
        username: formData.username,
        email: formData.email,
        password_hash: formData.password, // Cambiado a password_hash
        phone_number: formData.phone_number,
        age: formData.age,
      });

      if (response.status === 201) {
        alert("User created successfully");
        navigate("/main");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error creating user");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0F5572]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#0F5572]">Sign Up</h1>
        <div className="flex justify-center mb-6">
          <img
            src="\src\assets\clubInternLogo.png"
            alt="Intern Logo"
            className="w-20 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
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
              htmlFor="username"
              className="block font-medium mb-1 text-[#0F5572]"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
          <div>
            <label
              htmlFor="phone_number"
              className="block font-medium mb-1 text-[#0F5572]"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:border-[#0F5572] focus:ring-[#0F5572]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block font-medium mb-1 text-[#0F5572]"
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:border-[#0F5572] focus:ring-[#0F5572]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#0F5572] hover:bg-[#0A4360] text-white font-medium py-2 px-4 rounded-lg w-full"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-[#0F5572] hover:text-[#0A4360]">
            Already have an account/google mail? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
