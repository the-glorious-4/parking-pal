import React from 'react';
import './style.scss';

const tempState = {
    loggedIn: false
}

const Nav = () => {
    return (<>
        <nav>
            <a href='/' className='title'>Parking-Pal</a>
            {/* <div>look for parking</div> */}
            <div className='menu'>
                {tempState.loggedIn ? <span>Log-Out</span> : <><span>Log-In</span> <span>Sign-Up</span></>}
            </div>
        </nav>

        <div className='staticBG'></div>
        <div className='stickyBG'></div>
    </>
    )
}

export default Nav;