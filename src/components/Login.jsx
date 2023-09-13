import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here (e.g., send data to a server)
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-[25px] font-bold">Academy Admin</h1>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full py-2 px-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full py-2 px-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
