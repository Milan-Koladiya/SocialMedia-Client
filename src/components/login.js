import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../maincomponent/header'
import { useHistory } from 'react-router-dom'

function Login() {
    const [Username, setUsername] = useState()
    const [Password, setPassword] = useState()
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            history.push('/')
        }
    }, [])

    const loninData = () => {
        axios.post('http://localhost:3000/login', {
            Username, Password
        }).then((data) => {
            window.alert('Login succesfuuly')
            history.push('/')
            const { Username, Emailid } = data.data.user
            localStorage.setItem('jwt', data.data.token)
            localStorage.setItem('Username', Username)
            localStorage.setItem('Emailid', Emailid)
        }).catch((err) => {
            window.alert('Username Or Password invalid')
        })
    }

    return (
        <div>
            <Header />
            <div className="container px-5 py-24 mx-auto flex">
                <div style={{ maxWidth: '60%', padding: '0px auto' }} className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
                    <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">Login to our Site</h1>
                    <br />
                    <h3>Username</h3>
                    <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Enter Username" />
                    <h3>Password</h3>
                    <input type="Password" value={Password} onChange={(e) => setPassword(e.target.value)} className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Enter Password" /><br />
                    <button onClick={loninData} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                </div>
            </div>
        </div >
    )
}

export default Login; 