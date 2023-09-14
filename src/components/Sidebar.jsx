import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  let data = useSelector((state) => state);
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
        <ul className="mt-8">
          <li className="mb-4">
            <button
              onClick={() => changeTab("home")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "home" ? "font-bold" : ""
              }`}
            >
              Home
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => changeTab("about")}
              className={`text-white hover:text-gray-400 ${
                activeTab === "about" ? "font-bold" : ""
              }`}
            >
              About
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
        <div className="bg-white p-4 rounded-md shadow h-full">
          {/* Conditional rendering based on activeTab */}
          {activeTab === "home" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Home</h1>
              <p>This is the home content.</p>
            </div>
          )}
          {activeTab === "about" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">About</h1>
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
