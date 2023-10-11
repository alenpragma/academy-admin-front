import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const ManageLayouts = () => {
  let [navShow, setNavShow] = useState(false);
  let [navitem, setNavitem] = useState(false);
  let [navVal, setNavVal] = useState("");
  let [getNavItems, setGetNavItems] = useState([]);
  let handleNavChange = (e) => {
    setNavShow(true);
    setNavVal(
      e.target.value.charAt(0).toUpperCase() +
        e.target.value.slice(1, e.target.value.length)
    );
  };

  useEffect(() => {
    if (navVal.length < 1) {
      setNavShow(false);
    }
  }, [navVal]);

  let handleNavDataSend = () => {
    axios
      .post("https://academy-backend-95ag.onrender.com/api/v1/layouts/addnavdata", {
        name: navVal,
      })
      .then(() => {
        location.reload();
      });
  };
  useEffect(() => {
    axios
      .get("https://academy-backend-95ag.onrender.com/api/v1/layouts/getnav")
      .then((response) => {
        setGetNavItems(response.data);
      });
  }, []);

  let handleDelete = (id) =>{
    axios
    .post("https://academy-backend-95ag.onrender.com/api/v1/layouts/deletenav", {
        navdataId: id,
    })
    .then(() => {
      location.reload();
    });
  }

  return (
    <>
      <div className="">
        <h3 className="font-semibold">Add NavItems</h3>
        <div className="flex">
          <input
            onChange={handleNavChange}
            type="text"
            className="border"
            required
          />
          {navShow && (
            <div
              onClick={handleNavDataSend}
              className="p-3 bg-blue-950 text-white hover:text-blue-950 hover:bg-[#d1d1d1]"
            >
              Add
            </div>
          )}
        </div>
        <div
          onClick={() => setNavitem((prev) => !prev)}
          className="p-3 cursor-pointer rounded-lg bg-blue-950 text-white hover:text-blue-950 hover:bg-[#d1d1d1]  mt-3 inline-block"
        >
          Show Nav items
        </div>
        {navitem &&
          getNavItems.map((item, index) => (
            <div className=" flex gap-x-10 items-center">
              {item.name}
              <span onClick={()=>handleDelete(item._id)} className="hover:text-[#d1d1d1]">
                <FaTrashAlt />
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ManageLayouts;
