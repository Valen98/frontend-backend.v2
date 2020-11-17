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

    return (
    <nav>
        <h1 id="logo" onClick={() => checkPath()}>LOST</h1>
        <div className="nav-links">
            <button className="home" onClick={() => checkPath()}>HOME</button>
            <button className="about" onClick={() => {history.push('/About')}}>ABOUT</button>
            <button className="contact" onClick={() => {history.push('/Contact')}}>CONTACT</button>
        </div>    
    </nav>
    )
}

export default NavBar
