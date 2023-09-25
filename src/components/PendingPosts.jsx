import axios from "axios";
import React, { useEffect, useState } from "react";

const PendingPosts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  let [modalContent, setModalContent] = useState("");

  const openModal = (item) => {
    setModalContent(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setModalOpen(false);
  };

  const [news, setNews] = useState([]);
  useEffect(() => {
    async function getBlogs() {
      await axios
        .get("https://academy-backend-95ag.onrender.com/api/v1/blog/getBlog")
        .then((res) => {
          console.log("====================================");
          setNews(res.data.blogs);
          console.log("====================================");
        });
    }
    getBlogs();
  }, []);

  const formatDateTime = (createdAt) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };
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

  let handleApprove = (id) => {
    axios
      .post("https://academy-backend-95ag.onrender.com/api/v1/blog/approveBlog", { _id: id })
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

  console.log(pendingBlogs);
  return (
    <div className="flex flex-col-reverse gap-y-3">
      {pendingBlogs.length === 0
        ? "No pending Posts"
        : news.map(
            (item) =>
              item.status === "pending" && (
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-[300px] md:w-[400px]">
                  {/* Postcard Image */}
                  <img
                    src={item.image}
                    alt="Postcard Image"
                    className="w-full h-64 object-cover"
                  />

                  {/* Postcard Content */}
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold">
                      {truncateText(item.title, 10)}
                    </h2>
                    <p className="text-gray-700 mt-2">
                      {truncateText(item.content, 20)}
                    </p>
                    <p className="text-gray-700 mt-2">
                      Posted by {item.author}
                    </p>
                    <p className="text-gray-700 mt-2">
                      Posted in {formatDateTime(item.createdAt)}
                    </p>
                    {/* Add more content here as needed */}
                  </div>

                  {/* Postcard Buttons */}
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => openModal(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
          )}

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50  overflow-y-scroll"
        >
          <div className="fixed  inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white mt-[100px] rounded-lg p-8 max-w-md  mx-auto z-50  relative">
            <h2 className="text-2xl font-semibold mb-4">
              {modalContent.title}
            </h2>
            <p className="text-gray-700 mb-4 overflow-y-scroll h-[350px]">
              {modalContent.content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleDelete(modalContent._id);
                  closeModal();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  handleApprove(modalContent._id);
                  closeModal();
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPosts;
