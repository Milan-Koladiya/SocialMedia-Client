import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
import Header from '../maincomponent/header'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function Mypost() {
    const [Mypost, setMypost] = useState([]);
    const [Postavail, setPostavail] = useState(false)
    const history = useHistory()

    // ******** Getting Post *****
    useEffect(() => {
        axios.get('http://localhost:8080/mypost', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((data) => {
            setMypost(data.data)
            setPostavail(true)
        }).catch((err) => {
            console.log(err)
            window.alert('You are not loggedin')
        })
    }, [])

    // ***** Delete Post ***
    const deletePost = (id) => {
        axios.delete(`http://localhost:8080/deletepost/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(() => {
            window.alert('Post delete Successfully')
        }).catch((err) => {
            window.alert(err)
        })
    }

    // **** Update Post *****
    const UpdatePost = (Title, Body, Id) => {
        history.push({ pathname: '/addpost', state: { Title, Body, Id } })
    }


    if (!Postavail) {
        return <h1 style={{ color: 'red', fontSize: '40px' }}>Loading...</h1>
    }
    return (
        <>
            <Header />
            <div className='container' style={{ padding: '0px auto' }}>
                {
                    Mypost.map((post) => {
                        return < div className={styles.scard} key={post._id}>
                            <div className={styles.body}>
                                <h1 className={styles.title}>Title :- {post.Title}</h1>
                                <p className={styles.text}>Body :- {post.Body}</p>
                                <p className={styles.text}>Created At :- {post.createdAt}</p>
                                <p className={styles.text}>Updated At :- {post.updatedAt}</p>
                                <br /><button type="button" className="btn btn-outline-danger" onClick={() => deletePost(post._id)}>Delete Post</button>&nbsp;
                                <button onClick={() => UpdatePost(post.Title, post.Body, post._id)} type="button" className="btn btn-outline-primary">Update Post</button>
                            </div>
                        </div >
                    })
                }
            </div>
        </>
    )
}

export default Mypost; 