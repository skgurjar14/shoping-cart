import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      alert("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
