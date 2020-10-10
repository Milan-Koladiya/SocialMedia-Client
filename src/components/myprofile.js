import React, { useState } from "react";
import axios from "axios";
import Header from "../maincomponent/header";
import { useHistory } from "react-router-dom";
import API from "../apiconfi";

function Myprofile() {
  const history = useHistory();
  const [Username, setUsername] = useState(localStorage.getItem("Username"));
  const [Emailid, setEmailid] = useState(localStorage.getItem("Emailid"));

  // ***** Update Data *****
  const UpdateData = () => {
    axios
      .patch(
        `${API}/updateuser`,
        {
          Username,
          Emailid,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => JSON.parse(res.config.data))
      .then((data) => {
        window.alert("Update successfully");
        localStorage.setItem("Username", data.Username);
        localStorage.setItem("Emailid", data.Emailid);
        history.push("/myprofile");
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  return (
    <>
      <Header />
      <div className="container px-5 py-24 mx-auto flex">
        <div
          style={{ maxWidth: "60%", padding: "0px auto" }}
          className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
        >
          <h1
            className="text-gray-900 text-lg mb-1 title-font"
            style={{ fontWeight: 800 }}
          >
            Your Profile
          </h1>
          <br />
          <h3>Your Username</h3>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
          />
          <h3>Your Emailid</h3>
          <input
            type="email"
            value={Emailid}
            onChange={(e) => setEmailid(e.target.value)}
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
          />
          <button
            onClick={UpdateData}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Myprofile;
