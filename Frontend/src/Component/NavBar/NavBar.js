import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
    const history = useHistory()
    const location = useLocation()

    const checkPath = () => {
        if(location.pathname === '/'){
            return
        }else{
            return history.push('/')
        }
    }

    const logout = () => {
        if(sessionStorage.getItem('username')){
            return(
                <button className="Logout" onClick={() => {sessionStorage.clear(); history.go(0)}}>LOGOUT</button>
            )
        }
    }

    return (
    <nav>
        <h1 id="logo" onClick={() => checkPath()}>LOST</h1>
        <div className="nav-links">
            <button className="Profile" onClick={() => {history.push('/Profile')}}>PROFILE</button>
            {logout()}
        </div>    
    </nav>
    )
}

export default NavBar
