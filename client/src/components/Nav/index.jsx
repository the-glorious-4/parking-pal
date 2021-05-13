import React from 'react';
import './style.scss';
import Modal from '../Modal';

const tempState = {
    loggedIn: false
}

const Nav = () => {
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

        <div className='staticBG'></div>
        <div className='stickyBG'></div>
    </>);
}

export default Nav;