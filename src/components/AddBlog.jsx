import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";

const AddBlog = () => {
  let data = useSelector((state) => state);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "Community",
    author: data.userData.userInfo[0].fullName,
    authorID: data.userData.userInfo[0]._id,
    authorEmail: data.userData.userInfo[0].email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let truncatedValue = value;

    // Limit title to 20 words
    if (name === "title") {
      const words = value.trim().split(/\s+/);
      if (words.length > 20) {
        truncatedValue = words.slice(0, 20).join(" ");
        showToast("Title cannot exceed 20 words");
      }
    }

    // Limit content to 300 words
    if (name === "content") {
      const words = value.trim().split(/\s+/);
      if (words.length > 300) {
        truncatedValue = words.slice(0, 300).join(" ");
        showToast("Content cannot exceed 300 words");
      }
    }

    setFormData({
      ...formData,
      [name]: truncatedValue,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !formData.title ||
      !formData.content ||
      !formData.imageUrl ||
      !formData.category
    ) {
      toast("All fields are required");
      return;
    }

    // Make a POST request to the server
    await axios
      .post("https://academy-backend-95ag.onrender.com/api/v1/blog/createBlog", formData)
      .then((response) => {
        // Check if the request was successful
        console.log(response);
        if (response) {
          toast("Blog post created successfully");
          // Clear the form fields
          setFormData({
            title: "",
            content: "",
            imageUrl: "",
            category: "Community", // Reset category to default
          });
        } else {
          showToast("Failed to create a blog post");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("An error occurred while creating the blog post");
      });
  };

  const categories = [
    "Community",
    "Featured",
    "News",
    "Academy",
    "Blockchain",
    "Web3 Payments",
    "Developers",
  ];

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000, // Close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  //  fetch users
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    // Fetch all users from the backend endpoint
    fetch("https://academy-backend-95ag.onrender.com/api/v1/auth/allAdmins")
      .then((response) => response.json())
      .then((data) => {
        // Set the users in the state
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []); //
  console.log("dddd", users);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-x-3">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title (Max 20 words)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter the title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter the image URL"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold">
              Content (Max 300 words)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full md:w-[350px] "
              placeholder="Enter the content"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-5"
        >
          Submit
        </button>
      </form>
     
     {/* Simple Card */}
{users.map((user, userIndex) => {
  if (user._id === data.userData.userInfo[0]._id) {
    return (
      <div key={user._id} className="">
        <h2 className="text-[30px] font-semibold">Your Blogs</h2>
        {
        user.blog.length === 0 ? "No Blogs to Show":
        user.blog.map((blog, blogIndex) => (
          <div key={blog._id} className="bg-white rounded-lg p-4 flex items-center shadow-lg mb-2">
            <img
              src={blog.imageUrl} // Replace with your image URL
              alt="Blog Image"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.content}</p>
            </div>
            <div className="ml-auto flex gap-x-3">
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
})}
      <ToastContainer />
    </div>
  );
};

export default AddBlog;
