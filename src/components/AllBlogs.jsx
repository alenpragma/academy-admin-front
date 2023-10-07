import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBlogs = () => {
  const [news, setNews] = useState([]);
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    } else {
      return text;
    }
  };
  useEffect(() => {
    async function getBlogs() {
      await axios
        .get("https://academy-backend-95ag.onrender.com/api/v1/blog/getBlog")
        .then((res) => {
          // console.log("====================================");
          setNews(res.data.blogs);
          // console.log("====================================");
          console.log(res.data.blogs);
        });
    }
    getBlogs();
  }, []);
  let handleDelete = (id) => {
    axios
      .post(
        "https://academy-backend-95ag.onrender.com/api/v1/blog/deleteBlog",
        { _id: id }
      )
      .then((response) => {
        console.log(response);
        location.reload();
      });
  };
  let handlepin = (blog) => {
    axios
      .post("https://academy-backend-95ag.onrender.com/api/v1/blog/pinpost", {
        replace: "replace",
        ...blog,
      })
      .then((response) => {
        console.log(response);
        location.reload();
      });
  
  };
  return (
    <div key={news._id} className="flex  flex-col-reverse">
      {news.length === 0
        ? "No Blogs to Show"
        : news.map((blog, blogIndex) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg p-4 flex items-center shadow-lg mb-2"
            >
              <img
                src={blog.image} // Replace with your image URL
                alt="Blog Image"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-gray-600">
                  {truncateText(blog.content, 20)}
                </p>
                <small
                  className={`${
                    blog.status === "pending"
                      ? "text-red-700"
                      : "text-green-700"
                  } font-semibold`}
                >
                  {blog.status}
                </small>
              </div>
              <div className="ml-auto flex gap-x-3">
                <div className="flex gap-x-3">
                  <button
                    onClick={() => handlepin(blog)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                  >
                    Show on Banner
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default AllBlogs;
