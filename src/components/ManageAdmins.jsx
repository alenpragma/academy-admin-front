import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserShield, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const ManageAdmins = () => {
  const [users, setUsers] = useState([]);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [isDeleteAdmin, setIsDeleteAdmin] = useState(false);
  let data = useSelector((state) => state);

  const handleMakeAdmin = (userId,newRole) => {
 

    // Send a POST request to update the user's role
    axios
      .post("http://localhost:8000/api/v1/auth/updateRole", {
        userId: userId,
        newRole: newRole,
      })
      .then(() => {
        // Reload the user list after the update
        fetchUsers();
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const handleMakeSuperadmin = (userId,newRole) => {
    // Define the role you want to set (admin or superAdmin)

    // Send a POST request to update the user's role
    axios
      .post("http://localhost:8000/api/v1/auth/updateRole", {
        userId: userId,
        newRole: newRole,
      })
      .then(() => {
        // Reload the user list after the update
        fetchUsers();
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const handleDeleteAdmin = (id) => {
    setIsSuperadmin(false);
    setIsDeleteAdmin(true);
    axios
      .post("http://localhost:8000/api/v1/auth/deleteAdmin", { adminId: id })
      .then(() => {
        location.reload();
      });
  };

  const fetchUsers = () => {
    // Fetch all users from the backend endpoint
    fetch("http://localhost:8000/api/v1/auth/allAdmins")
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
  }, []); // Empty dependency array to fetch users only once

  return (
    <>
      <div className="max-w-screen-md mx-auto">
        {users.map(
          (user) =>
            user.email !== data.userData.userInfo[0].email && (
              <div
                key={user.id}
                className="flex justify-between items-center border p-4 my-2 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold">{user.fullName}</p>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-400">Role: {user.role}</p>
                  </div>
                </div>
                {
                    data.userData.userInfo[0].role !== "admin"  &&

                <div className="flex">
                  {user.role === "owner" ? (
                    <button
                      className={`bg-green-500 flex items-center text-white p-2 rounded-full shadow-md`}
                    >
                      <FaUserShield className="mr-2 text-lg" /> Owner
                    </button>
                  ) : user.role === "admin" ? (
                    <button
                      onClick={() => handleMakeSuperadmin(user._id,"superAdmin")}
                      className={`bg-blue-500 flex items-center text-white p-2 rounded-full hover:bg-blue-600 shadow-md`}
                    >
                      <FaUserShield className="mr-2 text-lg" /> Make Superadmin
                    </button>
                  ) : user.role === "superadmin" ? (
                    <button
                      className={`bg-blue-500 flex items-center text-white p-2 rounded-full shadow-md`}
                    >
                      <FaUserShield className="mr-2 text-lg" /> Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id,"admin")}
                      className={`bg-blue-500 flex items-center text-white p-2 rounded-full hover:bg-blue-600 shadow-md`}
                    >
                      <FaUserShield className="mr-2 text-lg" /> Make Admin
                    </button>
                  )}
                  {user.role !== "owner" && (
                    <button
                      onClick={() => handleDeleteAdmin(user._id)}
                      className={`bg-red-500 flex items-center text-white p-2 rounded-full hover:bg-red-600 ml-2 shadow-md`}
                    >
                      <FaTrash className="mr-2 text-lg" /> Delete Admin
                    </button>
                  )}
                </div>
                }
              </div>
            )
        )}
      </div>
    </>
  );
};

export default ManageAdmins;
