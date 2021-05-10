import React from 'react';
import './style.scss';

const tempState = {
    loggedIn: false
}

const Nav = () => {
    return (
        <nav>
            <a href='/' className='title'>Parking-Pal</a>
            <div className='menu'>
            {tempState.loggedIn ? <span>Log-Out</span> : <><span>Log-In</span> <span>Sign-Up</span></>}
            </div>
        </nav>
    )
}

export default Nav;