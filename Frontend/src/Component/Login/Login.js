import React, {useEffect, useState, useContext} from 'react'
import { gsap } from 'gsap'
import './Login.css'
import { useHistory } from 'react-router-dom'
import userProvider, { UserContext } from '../../Shared/Global/Provider/UserProvider'
import Axios from 'axios'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory()

    function validateForm() {
        return username.length > 0
    }
    
    const handleChange = e => {
        setUsername(e.target.value)
    }
    
    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async e =>{        
        const tl = gsap.timeline({defaults: {ease:"Power1.out"} });
        e.preventDefault()
        const response = await Axios.get(`http://localhost:1338/searchuser?username=${username}`)
        try {
            if(response.data[0].password == password) {

                setAuthenticatedUser(response.data)
                sessionStorage.setItem('username', response.data[0].username)

                //Checks if user is Admin or not
                if(response.data[0].isAdmin === true) {
                    sessionStorage.setItem('isAdmin', response.data[0].isAdmin) 
                }
                tl.fromTo('nav', {opacity:1}, {opacity:0, duration:1})
                tl.to('.main-result', { x: '-100%', duration: 5}, '-=1')
                tl.to('.profile-slider', {x: '-100%', duration:11 }, "-=6")
                setTimeout(() => history.push('/Profile'), 3000)
            }else{
                alert('Invalid Username or Password')
            }
        }catch(error){
            console.log(error)
            console.log("Hejpådig")
        }
    }

    const RightArrow = String.fromCharCode(8594)
    return (
        <div className="Login-div">
            <form className="login">
                <h1>Login</h1>
                <input 
                    placeholder="Username" 
                    type="username" className="Username" 
                    onChange={handleChange}
                    value={username}>
                </input>
                <input placeholder="Password" type="password"
                onChange={handlePasswordChange}></input>
                <button onClick={handleSubmit} disabled={!validateForm()}>{RightArrow}</button>
            </form>
        </div>
    )
}

export default Login
