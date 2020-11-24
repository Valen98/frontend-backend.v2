import gsap from 'gsap'
import React, {useContext, useEffect, useState }from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../Shared/Global/Provider/UserProvider'
import './ProfileView.css'
import Axios from 'axios'
import Modal from 'react-modal'
import AdminView from './AdminView'

function ProfileView() {
    const [users, setUsers] = useState([])
    const [editUsername, setEditUsername] = useState()
    const [editPassword, setEditPassword] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(!sessionStorage.getItem('username')){
            alert('You must sign in')
            history.push('/')
        }else{
            const tl = gsap.timeline({defaults: {ease:"Power1.out"} });
            tl.to('.profile-slider', {x: '-100%', duration:8 }, '-=3')
            tl.fromTo('.profile-card', {opacity:0}, {opacity: 1, duration:2}, '-=3')
            tl.fromTo('.all-users', {opacity: 0}, {opacity: 1, duration:2}, '-=1')
            tl.fromTo('nav', {opacity:0}, {opacity:1, duration:2}, '-=3')
        }
    }, [])

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
            <div className="all-users" id="users">
                <AdminView/>
            </div>
            <div className="profile-slider">
            </div>
        </div>
    )
}

export default ProfileView
