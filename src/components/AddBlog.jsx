import React, { useState } from "react";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    imageUrl: "", // New input field for image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here, e.g., send formData to the server

    // Clear the form fields
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      imageUrl: "", // Clear image URL field as well
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold">
          Title
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
          Content
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
        <label htmlFor="author" className="block text-gray-700 font-bold">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter the author's name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter the category"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-bold">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter tags (comma-separated)"
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
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddBlog;
