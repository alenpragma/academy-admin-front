import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import { activeUser } from "../Slices/userSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  let disp = useDispatch()
  const navigate = useNavigate();
  let data = useSelector((state) => state);
  console.log("dddddd",data.userData.userInfo[0].fullName);
  
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
  let handlelogout = () =>{
    localStorage.removeItem("userData");
    disp(activeUser(null));
    navigate("/login");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Toggle Button for Small Screens */}
      {isOpen ? null : (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-0 left-0 z-20 m-4 p-2 bg-gray-800 text-white rounded-full"
        >
          &#x22EF; {/* 3-dot icon */}
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
            
        <small className="text-[16px] mt-3  font-bold text-white">{data.userData.userInfo[0].role.charAt(0).toUpperCase()+data.userData.userInfo[0].role.slice(1,data.userData.userInfo[0].role.length)} Profile</small>
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
          <li className="mb-4">
            <button
              onClick={() => changeTab("Manage Admin")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "Manage Admin" ? "font-bold" : ""
              }`}
            >
              Manage Admins
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => changeTab("services")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "services" ? "font-bold" : ""
              }`}
            >
              Services
            </button>
          </li>
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
          <div className="text-[25px]">{data.userData.userInfo[0].fullName}.</div>
          <div className="text-[30px] hover:text-[#d1d1d1]">
            <BiSolidLogOut onClick={handlelogout} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow h-full">
          {/* Conditional rendering based on activeTab */}
          {activeTab === "Dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <p>This is the home content.</p>
            </div>
          )}
          {activeTab === "Manage Admin" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Manage Admins</h1>
              <p>This is the about content.</p>
            </div>
          )}
          {activeTab === "services" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Services</h1>
              <p>This is the services content.</p>
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
