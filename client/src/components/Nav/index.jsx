import React from 'react';
import './style.scss';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { RENDER_LOGIN_MODAL, RENDER_SIGNUP_MODAL } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const tempState = {
    loggedIn: false
}

const Nav = () => {
    const [state, dispatch] = useStoreContext();

    const renderLoginModal = () => {
        dispatch({ type: RENDER_LOGIN_MODAL });
    };
    const renderSignupModal = () => {
        dispatch({ type: RENDER_SIGNUP_MODAL });
    };

    return (<>
        <nav>
            <a href='/' className='title'>Parking-Pal</a>
            {/* <div>look for parking</div> */}
            <div className='menu'>
            <span><a href='#infoSection'>How It Works</a></span>
                {tempState.loggedIn ? <span>Log-Out</span> :
                <><span onClick={renderLoginModal}>Log-In</span> <span onClick={renderSignupModal}>Sign-Up</span></>}
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