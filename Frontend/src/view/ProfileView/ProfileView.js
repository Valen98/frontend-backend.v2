import gsap from 'gsap'
import React, {useContext, useEffect, useState }from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../Shared/Global/Provider/UserProvider'
import './ProfileView.css'

function ProfileView() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [profilePicture, setProfilePicture] = useState({})
    const history = useHistory()
    
    useEffect(() => {
        if(localStorage.getItem('username') === ''){
            alert('You must sign in')
            history.push('/')
        }
        const tl = gsap.timeline({defaults: {ease:"Power1.out"} });
        tl.to('.profile-slider', {x: '-100%', duration:8 }, '-=3')
        tl.fromTo('.profile-card', {opacity:0}, {opacity: 1, duration:2}, '-=3')
    }, [])


    const displayPicture = () => {
        if(profilePicture){
            return(
                <div>
                </div>
            )
        }else{
            alert("nothing happened")
        }
    }
    
    return (
        <div className="profile-slideshow">
            <div className="profile-view">
                <div className="profile-card">
                    <img src={'https://thispersondoesnotexist.com/image'}/>
                    <div className="welcome">
                        <p>Welcome {sessionStorage.getItem('username')}</p>
                    </div>
                </div>
            </div>
            <div className="profile-slider">
                <h1>Always Lost</h1>
            </div>
        </div>
    )
}

export default ProfileView
