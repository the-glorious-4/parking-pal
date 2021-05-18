import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

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
            <div className='menu'>
                {Auth.loggedIn() ?
                <>
                    <span><Link to="/dashboard">Your Dashboard</Link></span>
                    <span><Link to="/findparking">Find a Space</Link></span>
                    <span><Link to="/addparking">Host a Spot</Link></span>
                    <span><Link to="/profile">Edit Profile</Link></span>
                    <span><Link to="/history">History</Link></span>
                    <span onClick={logout}>Log-Out</span>
                </>
                :
                <>
                    <span><a href='#infoSection'>How It Works</a></span>
                    <span onClick={renderLoginModal}>Log-In</span>
                    <span onClick={renderSignupModal}>Sign-Up</span>
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