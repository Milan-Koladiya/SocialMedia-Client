import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../maincomponent/header";
import { useHistory, useLocation } from "react-router-dom";
import API from "../apiconfi";

function Addpost(props) {
  const [Title, setTitle] = useState();
  const [Body, setBody] = useState();
  const [UpdatedTitle, setUpdatedTitle] = useState("");
  const [UpdatedBody, setUpdatedBody] = useState("");
  const [UpdatedId, setUpdatedId] = useState();

  const history = useHistory();
  const location = useLocation();

  //**** Addpost */
  const sendPost = () => {
    if (!Title || !Body) {
      return toast.warn("please add both field");
    }

    axios
      .post(
        `${API}/createpost`,
        {
          Title,
          Body,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(() => {
        toast.success("Post saved Successfully...");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //**** Update Post */

  useEffect(() => {
    if (location.state) {
      const post = location.state;
      console.log(post);
      setUpdatedTitle(post.Title);
      setUpdatedBody(post.Body);
      setUpdatedId(post.Id);
    }
  }, [location.state]);

  const UpdatePost = () => {
    axios
      .patch(
        `${API}/updatepost/${UpdatedId}`,
        {
          Title: UpdatedTitle,
          Body: UpdatedBody,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(() => {
        toast.success("Post Updated succssfully");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Data not Found");
      });
  };

  return (
    <Fragment>
      <Header />
      {location.state ? (
        <div className="container px-5 py-24 mx-auto flex">
          <div
            style={{ maxWidth: "60%", padding: "0px auto" }}
            className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
          >
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Update Post
            </h1>
            <br />
            <h3>Title</h3>
            <input
              type="text"
              value={UpdatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Title"
            />
            <h3>Body</h3>
            <input
              type="text"
              value={UpdatedBody}
              onChange={(e) => setUpdatedBody(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <button
              onClick={UpdatePost}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Update Post
            </button>
          </div>
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto flex">
          <div
            style={{ maxWidth: "60%", padding: "0px auto" }}
            className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
          >
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Add Post
            </h1>
            <br />
            <h3>Title</h3>
            <input
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Title"
            />
            <h3>Body</h3>
            <input
              type="text"
              value={Body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <button
              onClick={sendPost}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              AddPost
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Addpost;
