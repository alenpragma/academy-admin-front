import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../Slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  let data = useSelector((state) => state);
  let disp = useDispatch();
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

    axios
      .post("http://localhost:8000/api/v1/auth/login", formData) // Replace with your backend login endpoint
      .then((response) => {
        console.log("hi",response.data[0]);
        if(response.data.error){
         return toast(response.data.error && response.data.error);
        }
        if (response) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          disp(activeUser(response.data));
          return navigate("/admin-dashboard");
        }
       
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // Handle network or other errors
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
      <p className="mt-4">
        Don't have an admin account?{" "}
        <Link className="text-green-500" to="/">
          Register Here
        </Link>
      </p>
      <ToastContainer/>
    </div>
  );
};

export default Login;
