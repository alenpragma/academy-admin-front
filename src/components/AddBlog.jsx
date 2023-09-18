import React, { useState } from "react";
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
    console.log(formData.authorEmail);
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
      .post("http://localhost:8000/api/v1/blog/createBlog", formData)
      .then((response) => {
        // Check if the request was successful
        console.log(response);
        if (response.status === 200) {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Blog</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="content" className="block text-gray-700 font-bold">
            Content (Max 300 words)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full h-32"
            placeholder="Enter the content"
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

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBlog;
