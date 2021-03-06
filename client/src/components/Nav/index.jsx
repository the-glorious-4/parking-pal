import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import garage from '../../images/garage.png';
import Auth from "../../utils/auth";
import { RENDER_LOGIN_MODAL, RENDER_SIGNUP_MODAL } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const Nav = () => {
    const [state, dispatch] = useStoreContext();

    const renderLoginModal = () => {
        dispatch({ type: RENDER_LOGIN_MODAL });
    };
    const renderSignupModal = () => {
        dispatch({ type: RENDER_SIGNUP_MODAL });
    };

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (<>
        <nav>
            <Link to='/'>
                <span className='title'>Parking-Pal</span>
            </Link>
            <img src={garage}
                className='menuBtn'
                alt="menu button"
                onClick={() => {
                    let x = document.getElementById('navMenu');
                    if (x.className === "menu") {
                        x.className += " responsive";
                    } else {
                        x.className = "menu";
                    }
                }} />

            <div id='navMenu' className='menu'>
            
                {Auth.loggedIn() ?
                    <>
                        <span><Link className='menuSpan' to="/dashboard">Dashboard</Link></span>
                        <span><Link className='menuSpan' to="/findparking">Find a Space</Link></span>
                        <span><Link className='menuSpan' to="/myspots">Host a Spot</Link></span>
                        {/* <span><Link className='menuSpan' to="/profile">Edit Profile</Link></span> */}
                        {/* <span><Link className='menuSpan' to="/history">History</Link></span> */}
                        <span className='menuSpan'  onClick={logout}>Log-Out</span>
                    </>
                    :
                    <>
                        <span><a className='menuSpan' href='/#infoSection'>How It Works</a></span>
                        <span><a className='menuSpan' href='/#aboutUs'>About Us</a></span>
                        <span className='menuSpan' onClick={renderLoginModal}>Log-In</span>
                        <span className='menuSpan' onClick={renderSignupModal}>Sign-Up</span>
                    </>}
            </div>
        </nav>
        {state.loginRendered ? <LoginModal /> :
            state.signupRendered ? <SignupModal /> : null}

        <div className='staticBG'></div>
        <div className='stickyBG'></div>
    </>
    );
}

export default Nav;