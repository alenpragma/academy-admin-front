import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  let data = useSelector((state) => state);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hamzaaa");
    const response = await axios
      .post(
        "https://academy-backend-95ag.onrender.com/api/v1/auth/registration",
        formData
      )
      .then((data) => {
        console.log("text", data.data);
        if (data.data.error === "Registration successfull!!") {
          navigate("/login");
          setFormData({
            fullName: "",
            email: "",
            password: "",
          });
          return 
        }
        if (data.data.error) {
          toast(data.data.error && data.data.error);
        }
      });
  };
  useEffect(() => {
    if (data.userData.userInfo) {
      navigate("/admin-dashboard");
    }
  }, []);

  return (
    <div className="mx-auto max-w-md p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-[25px] font-bold">Academy Admin</h1>
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="block w-full py-2 px-3 border rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
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
          Signup
        </button>
      </form>
      <ToastContainer />
      <p className="mt-4">
        Already have an admin account?{" "}
        <Link className="text-green-500" to="/login">
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
