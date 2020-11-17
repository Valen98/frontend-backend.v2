import Axios from 'axios'
import React, { useState } from 'react'
import './Register.css'

function Register() {
    const [Data, setData] = useState([])
    const [newUser, setNewUser] = useState()
    const [newUserPassword, setNewUserPassword] = useState()
    
    const registerNewUser = e => {
        e.preventDefault()
        console.log("Added user" + newUser + " " + newUserPassword)
        Axios.post('http://localhost:1338/user', {username: newUser, password: newUserPassword})
        console.log(newUser + " " + newUserPassword)
    }

    return (
        <div className="register-form">
            <form>
                <h1>Register</h1>
                <h1>Username: </h1> <input onChange={(e) => setNewUser(e.target.value)}/> 
                <h1>Password</h1> <input onChange={(e) => setNewUserPassword(e.target.value)}/>
                <button onClick={registerNewUser}>Register</button>
            </form>
        </div>
    )
}

export default Register
