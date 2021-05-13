import React from 'react';
import './style.scss';
import LoginModal from '../LoginModal';
import { RENDER_LOGIN_MODAL } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const tempState = {
    loggedIn: false
}

const Nav = () => {
    const [state, dispatch] = useStoreContext();

    const renderLoginModal = () => {
        dispatch({ type: RENDER_LOGIN_MODAL });
    };
    const renderSignupModal = () => {console.log("signup")};

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
        {state.loginRendered ? <LoginModal /> : null}

        <div className='staticBG'></div>
        <div className='stickyBG'></div>
    </>
    );
}

export default Nav;