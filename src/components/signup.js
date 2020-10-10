import React, { Fragment, useState } from "react";
import axios from "axios";
import Header from "../maincomponent/header";
import { useHistory } from "react-router-dom";
import API from "../apiconfi";
import { toast } from "react-toastify";

function Signup() {
  const [Username, setUsername] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [Password, setPassword] = useState("");
  const [Image, setImage] = useState("");
  const history = useHistory();

  const sendData = (e) => {
    console.log(Username, Emailid, Password, Image);

    axios
      .post(`${API}/signup`, {
        Username,
        Emailid,
        Password,
        avtar: Image,
      })
      .then((data) => {
        console.log(data);
        if (data.status == 204) {
          return toast.error("Plese Choose diffrent username");
        }
        toast.success("Successfully login to our site");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please Provide valid information");
      });
    e.preventDefault();
  };
  return (
    <Fragment>
      <Header />
      <div className="container px-5 py-24 mx-auto flex">
        <div
          style={{ maxWidth: "60%", padding: "0px auto" }}
          className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
        >
          <form onSubmit={(e) => sendData(e)}>
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login to our Site
            </h1>
            <br />
            <h3>Username</h3>
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Username"
            />
            <h3>Emailid</h3>
            <input
              type="email"
              value={Emailid}
              onChange={(e) => setEmailid(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Emailid"
            />
            <h3>Password</h3>
            <input
              type="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Password"
            />
            <h3>Upload Profile</h3>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0].name)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            />
            <br />
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
