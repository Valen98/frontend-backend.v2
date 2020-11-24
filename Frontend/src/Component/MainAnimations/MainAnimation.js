import React, {useEffect} from 'react'
import { gsap }from 'gsap'
import './MainAnimation.css'
import Login from '../Login/Login'
import Register from '../Register/Register'
function MainAnimation() {

    useEffect(() =>{
        const tl = gsap.timeline({defaults: {ease:"Power1.out"} });
        tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
        tl.to(".slider", { y: "-100%", duration: 2, delay: 0.5 });
        tl.to(".intro", { y: "-100%", duration: 2 }, "-=2");
        tl.fromTo("nav", {opacity:0}, {opacity: 1, duration:1})
        tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
        tl.fromTo("form", {opacity: 0}, {opacity: 1, duration: 1}, "-=1")
        tl.fromTo('.logged-in', {opacity: 0}, {opacity:1, duration: 2})
    })
    
    const signedin = () => {
        if(!sessionStorage.getItem('username')) {
            return (
                <div>
                    <Login />
                    <Register />
                </div>
            )
        }else {
            return (
                <div className="logged-in">
                    <h1>You are already logged in as</h1>
                    <h1>{sessionStorage.getItem('username')}</h1>
                </div>
            )
        }
    }

    return (
        <div className="mainPage">
            <div className="main-result">
                <section>
                    <h2 className="big-text">ALWAYS LOST</h2>
                    {signedin()}
                </section>
                <div className="intro">
                    <div className="intro-text">
                        <h1 className="hide">
                            <span className="text">Running</span>
                        </h1>
                        <h1 className="hide">
                            <span className="text">Is Never</span>
                        </h1>
                        <h1 className="hide">
                            <span className="text">An Option</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="slider"></div>
            <div className="profile-slider"></div>
        </div>
    )
}

export default MainAnimation
