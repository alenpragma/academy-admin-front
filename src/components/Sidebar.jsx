import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import { activeUser } from "../Slices/userSlice";
import ManageAdmins from "./ManageAdmins";
import AddBlog from "./AddBlog";
import PendingPosts from "./PendingPosts";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  let disp = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state);
  console.log("dddddd", data.userData.userInfo[0].fullName);

  useEffect(() => {
    // Open the sidebar by default on larger screens
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      setIsOpen(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeTab = (tabName) => {
    setActiveTab(tabName);
    // Close the sidebar after selecting a tab on small screens
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!data.userData.userInfo) {
      navigate("/login");
    }
  }, []);
  let handlelogout = () => {
    localStorage.removeItem("userData");
    disp(activeUser(null));
    navigate("/login");
  };

  const [pendingBlogs, setPendingBlogs] = useState([]);
  useEffect(() => {
    async function getPendingBlogs() {
      await axios
        .get("https://academy-backend-95ag.onrender.com/api/v1/blog/getPendingBlogs")
        .then((res) => {
          console.log("====================================");
          setPendingBlogs(res.data.blogs);
          console.log("====================================");
        });
    }
    getPendingBlogs();
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar Toggle Button for Small Screens */}
      {isOpen ? null : (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed bottom-4  right-4 z-20 w-[30px] h-[30px] m-4  bg-gray-800 text-white rounded-full "
        >
          +
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`bg-gray-800 w-64 px-4 py-8 fixed top-0 left-0 bottom-0 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="text-white text-2xl font-bold">
          Academy Admin Dashboard
        </div>
        <div className="mt-3">
          <small className="text-[16px] mt-3  font-bold text-white">
            {data.userData.userInfo[0].role.charAt(0).toUpperCase() +
              data.userData.userInfo[0].role.slice(
                1,
                data.userData.userInfo[0].role.length
              )}{" "}
            Profile
          </small>
        </div>
        <ul className="mt-8">
          <li className="mb-4">
            <button
              onClick={() => changeTab("Dashboard")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "Dashboard" ? "font-bold" : ""
              }`}
            >
              Dashboard
            </button>
          </li>
          {
            <li className="mb-4">
              <button
                onClick={() => changeTab("Manage Admin")}
                className={`text-white hover:text-gray-400 ${
                  activeTab === `Manage Admin` ? "font-bold" : ""
                }`}
              >
                {data.userData.userInfo[0].role === "superAdmin" ||
                data.userData.userInfo[0].role === "owner"
                  ? "Manage Admins"
                  : "All Admins"}
              </button>
            </li>
          }
          <li className="mb-4">
            <button
              onClick={() => changeTab("Add Blogs")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "Add Blogs" ? "font-bold" : ""
              }`}
            >
              Add Blogs
            </button>
          </li>
          {(data.userData.userInfo[0].role === "superAdmin" ||
            data.userData.userInfo[0].role === "owner") && (
            <li className="mb-4">
              <button
                onClick={() => changeTab("Pending Posts")}
                className={`text-white hover:text-gray-400 flex items-center gap-x-2 ${
                  activeTab === "Pending Posts" ? "font-bold" : ""
                }`}
              >
                Pending Posts <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center text-black text-[10px]">{pendingBlogs.length}</div>
              </button>
            </li>
          )}
          <li className="mb-4">
            <button
              onClick={() => changeTab("contact")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "contact" ? "font-bold" : ""
              }`}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className={`flex-1 p-4 ${isOpen ? "ml-64" : "w-full"}`}>
        <div className="bg-white p-4 rounded-md shadow flrx mb-2 flex items-center  justify-between">
          <div className="text-[25px]">
            {data.userData.userInfo[0].fullName}.
          </div>
          <div className="text-[30px] hover:text-[#d1d1d1]">
            <BiSolidLogOut onClick={handlelogout} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow h-full overflow-y-scroll">
          {/* Conditional rendering based on activeTab */}
          {activeTab === "Dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <p>This is the home content.</p>
            </div>
          )}
          {activeTab === "Manage Admin" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">
                {data.userData.userInfo[0].role === "admin"
                  ? "All Admins"
                  : "Manage Admins"}
              </h1>
              <ManageAdmins />
            </div>
          )}
          {activeTab === "Add Blogs" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Add Blogs</h1>
              <AddBlog />
            </div>
          )}
          {activeTab === "Pending Posts" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Pending Posts</h1>
              <PendingPosts />
            </div>
          )}
          {activeTab === "contact" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Contact</h1>
              <p>This is the contact content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;




