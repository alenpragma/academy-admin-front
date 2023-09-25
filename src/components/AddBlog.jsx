import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

const AddBlog = () => {
  let [loader, setLoader] = useState(false);
  let [blogLoader, setBlogLoader] = useState(true);
  let [updateLoader, setUpdateLoader] = useState(false);
  let [updateBtnShow, setUpdateBtnShow] = useState(false);
  let [editHeader,setEditHeader] = useState("")

  let [editId, setEditId] = useState();
  let [edit, setEdit] = useState(false);
  let [editIndex, setEditIndex] = useState(-1);
  let data = useSelector((state) => state);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    status:
      data.userData.userInfo[0].role === "admin"
        ? "pending"
        : data.userData.userInfo[0].role === "owner"
        ? "Post by owner"
        : "Post by superadmin",
    category: "Community",
    author: data.userData.userInfo[0].fullName,
    authorID: data.userData.userInfo[0]._id,
    authorEmail: data.userData.userInfo[0].email,
  });

  const handleImageChange = async (e) => {
    setUpdateBtnShow(true);
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const handleChange = (e) => {
    setUpdateBtnShow(true);
    const { name, value } = e.target;
    let truncatedValue = value;

    // Limit title to 50 words
    if (name === "title") {
      const words = value.trim().split(/\s+/);
      if (words.length > 50) {
        truncatedValue = words.slice(0, 50).join(" ");
        showToast("Title cannot exceed 20 words");
      }
    }


    setFormData({
      ...formData,
      [name]: truncatedValue,
    });

    console.log(formData);
  };

  //   console.log("====================================");
  //   console.log(e);
  //   console.log("====================================");
  //   e.preventDefault();
  //   setLoader(true);
  //   // Check for empty fields
  //   if (
  //     !formData.title ||
  //     !formData.content ||
  //     // !formData.image ||
  //     !formData.category
  //   ) {
  //     toast("All fields are required");
  //     setLoader(false);
  //     return;
  //   }

  //   await axios
  //     .post(
  //       "http://localhost:8000/api/v1/blog/createBlog",
  //       {
  //         ...formData,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       // Check if the request was successful
  //       // location.reload();
  //       console.log(response);
  //       if (response) {
  //         toast("Blog post created successfully");
  //         setLoader(false);
  //         // Clear the form fields
  //         setFormData({
  //           title: "",
  //           content: "",
  //           image: "",
  //           category: "Community", // Reset category to default
  //         });
  //       } else {
  //         setLoader(false);
  //         showToast("Failed to create a blog post");
  //       }
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       showToast("An error occurred while creating the blog post");
  //     });
  // };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      return handleSubmit();
    }
    if (edit) {
      return handleUpdate();
    }
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    const sendformData = new FormData();

    sendformData.append("title", formData.title);
    sendformData.append("content", formData.content);
    sendformData.append("category", formData.category);
    sendformData.append("image", formData.image); // Add the image file to the FormData
    sendformData.append("author", formData.author); // Add author field
    sendformData.append("authorID", formData.authorID); // Add authorID field
    sendformData.append("authorEmail", formData.authorEmail); // Add authorEmail field
    sendformData.append("status", formData.status); // Add status field

    await axios
      .post(
        "https://academy-backend-95ag.onrender.com/api/v1/blog/createBlog",
        sendformData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // Check if the request was successful
        location.reload();
        console.log(response);
        if (response) {
          toast("Blog post created successfully");
          setLoader(false);
          // Clear the form fields
          setFormData({
            title: "",
            content: "",
            image: "", // Reset the image field
            category: "Community", // Reset category to default
            author: "", // Reset author field
            authorID: "", // Reset authorID field
            authorEmail: "", // Reset authorEmail field
            status: "pending", // Reset status to default
          });
        } else {
          setLoader(false);
          showToast("Failed to create a blog post");
        }
      })
      .catch((error) => {
        setLoader(false);
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
        setBlogLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []); //

  // edit blog
  let handleEdit = (blog, blogIndex) => {
    setEditHeader(blog.title)
    setEditId(blog._id);
    console.log(editId);
    setEdit(true);
    setEditIndex(blogIndex);
    setFormData({
      title: blog.title,
      content: blog.content,

      category: blog.category,
      author: data.userData.userInfo[0].fullName,
      authorID: data.userData.userInfo[0]._id,
      authorEmail: data.userData.userInfo[0].email,
    });
  };
  let cancleUpdate = () => {
    setEditHeader()
    setEditIndex(-1);
    setFormData({
      title: "",
      content: "",
      image: "",
      category: "Community", // Reset category to default
    });
    setEdit(false);
  };
  // update the data from database

  let handleUpdate = async (e) => {
    setUpdateLoader(true);
    console.log("dhnjfchjdhcj");
    const editformData = new FormData();
    editformData.append("title", formData.title);
    editformData.append("content", formData.content);
    editformData.append("category", formData.category);
    editformData.append("image", formData.image); // Add the image file to the FormData
    editformData.append("author", formData.author); // Add author field
    editformData.append("authorID", formData.authorID); // Add authorID field
    editformData.append("authorEmail", formData.authorEmail); // Add authorEmail field
    editformData.append(
      "status",
      data.userData.userInfo[0].role === "admin"
        ? "pending"
        : data.userData.userInfo[0].role === "owner"
        ? "Post by owner"
        : "Post by superadmin"
    );
    editformData.append("_id", editId); // Add status field
    console.log(editformData);
    await axios
      .post(
        "https://academy-backend-95ag.onrender.com/api/v1/blog/updateBlog",
        editformData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        location.reload();
        setEdit(false);
        setUpdateLoader(false);
        setFormData({
          title: "",
          content: "",
          image: "",
          category: "Community", // Reset category to default
        });
        toast("blog successfully updated");
        console.log(response);
      })
      .catch(() => {
        setUpdateLoader(false);
      });
  };

  // handle delete
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

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{!edit?"Add a New Blog":`Edit your Blog - ${editHeader}`}</h1>
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        method="post"
      >
        <div className="flex flex-col md:flex-row gap-x-3">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              Title (Max 50 words)
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
            <label htmlFor="image" className="block text-gray-700 font-bold">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              // value={formData.image}
              onChange={handleImageChange}
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
              Content 
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full md:w-[250px] "
              placeholder="Enter the content"
              required
            />
          </div>
        </div>
        {loader ? (
          <InfinitySpin color="#d1d1d1" />
        ) : edit ? (
          updateLoader ? (
            <InfinitySpin color="#d1d1d1" />
          ) : (
            <div className="flex gap-x-3">
              {updateBtnShow && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 cursor-pointer rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              )}
              <button
                onClick={cancleUpdate}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Cancel Update
              </button>
            </div>
          )
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-5"
          >
            Submit
          </button>
        )}
      </form>

      <h2 className="text-[30px] font-semibold">Your Blogs</h2>
      {/* Simple Card */}
      {blogLoader ? (
        <div className="flex justify-center">
          <InfinitySpin color="#d1d1d1" />
        </div>
      ) : (
        users.map((user, userIndex) => {
          if (user._id === data.userData.userInfo[0]._id) {
            return (
              <div key={user._id} className="flex  flex-col-reverse">
                {user.blog.length === 0
                  ? "No Blogs to Show"
                  : user.blog.map((blog, blogIndex) => (
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
                          <h2 className="text-lg font-semibold">
                            {blog.title}
                          </h2>
                          <p className="text-gray-600">{truncateText(blog.content, 20)}</p>
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
                          {edit && editIndex === blogIndex ? (
                            <InfinitySpin color="#d1d1d1" />
                          ) : (
                            <div className="flex gap-x-3">
                              <button
                                onClick={() => handleEdit(blog, blogIndex)}
                                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            );
          }
        })
      )}
      <ToastContainer />
    </div>
  );
};

export default AddBlog;
