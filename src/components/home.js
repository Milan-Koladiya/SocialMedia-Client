import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import Header from "../maincomponent/header";
import axios from "axios";
import style from "../styles/home.module.css";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [getPost, setgetPost] = useState(true);
  const history = useHistory();
  const [activePage, setactivePage] = useState(1);
  const [total, settotal] = useState();

  // Fetch all Post
  useEffect(() => {
    getRecords(activePage);
  }, []);

  const getRecords = (pageNumber) => {
    axios
      .get(`http://localhost:8080/allpost?page=${pageNumber}`)
      .then((data) => {
        setactivePage(pageNumber);
        setPosts(data.data.data);
        settotal(data.data.doc);
        setgetPost(false);
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  // Delete Post
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8080/deletepost/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        window.alert("delete successfully");
        history.push({ pathname: "/addpost" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update Post
  const UpdatePost = (Title, Body, Id) => {
    history.push({ pathname: "/addpost", state: { Title, Body, Id } });
  };

  const handlechangespage = (pageNumber) => {
    getRecords(pageNumber);
    // console.log(pageNumber);
  };

  if (getPost) {
    return (
      <>
        <h1 style={{ color: "red", fontSize: "30px" }}>Loading...</h1>
      </>
    );
  }
  return (
    <>
      <Header />
      <div>
        <nav aria-label="Page navigation example" className={style.nav}>
          <ul>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={9}
              totalItemsCount={total}
              onChange={handlechangespage}
              itemClass="page-item"
              linkClass="page-link"
              activeLinkClass="page-link"
              activeClass="active"
            />
          </ul>
        </nav>
        <div className="container" className={style.maindiv}>
          {posts.map((post, index) => {
            return (
              <div className={styles.scard} key={index}>
                <div className={styles.body}>
                  <h3 className={styles.indexs}>Post :- {index + 1}</h3>
                  <h3>
                    <span>Posted By :-</span> {post.Postedby.Username}
                  </h3>
                  <h1 className={styles.title}>
                    <span>Title :-</span> {post.Title}
                  </h1>
                  <p className={styles.text}>
                    <span>Body :-</span> {post.Body}
                  </p>
                  <p className={styles.text}>
                    <span>Created At :-</span> {post.createdAt}
                  </p>
                  <p className={styles.text}>
                    <span>Updated At :-</span> {post.updatedAt}
                  </p>
                  {post.Postedby.Username ===
                  localStorage.getItem("Username") ? (
                    <>
                      <br />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete Post
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          UpdatePost(post.Title, post.Body, post._id)
                        }
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Update Post
                      </button>{" "}
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
