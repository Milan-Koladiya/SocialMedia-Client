import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import API from "../apiconfi";
import { toast } from "react-toastify";

console.log("............", API);

function Header(props) {
  const history = useHistory();
  const [IsLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // ***** Logout ****
  const Logout = () => {
    axios
      .post(
        `${API}/logout`,
        {
          key: "value",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(() => {
        localStorage.clear();
        history.push("/login");
      })
      .catch((err) => {
        toast.warn("You are login to 24 hour ");
        history.push("/login");
        localStorage.clear();
      });
  };
  return (
    <Fragment>
      <ul>
        <header className="text-gray-700 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              to="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span
                className="ml-3 text-xl"
                style={{ color: "black", fontWeight: 500 }}
              >
                ReactJS
              </span>
            </Link>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              {IsLogin ? (
                <>
                  <Link to="/" className="mr-5 hover:text-gray-900">
                    Home
                  </Link>
                  <Link to="/addpost" className="mr-5 hover:text-gray-900">
                    Add Post
                  </Link>
                  <Link to="/mypost" className="mr-5 hover:text-gray-900">
                    My Post
                  </Link>
                  <Link to="/myprofile" className="mr-5 hover:text-gray-900">
                    My Profile
                  </Link>
                  <button
                    onClick={() => Logout()}
                    className="mr-5 hover:text-gray-900"
                  >
                    {" "}
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mr-5 hover:text-gray-900">
                    Login
                  </Link>
                  <Link to="/signup" className="mr-5 hover:text-gray-900">
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
      </ul>
    </Fragment>
  );
}

export default Header;
