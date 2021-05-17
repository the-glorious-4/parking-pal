import React from 'react';
import Nav from '../../components/Nav';
import noParking from '../../images/NoParking.png';

import './style.scss';

const NoMatch = () => {
    window.setTimeout( function(){
        window.location = "/";
    }, 4000 );

    return (<div className='sorryBody'>
        <Nav />
        <img src={noParking} alt=""/>
        <div>
            <h1>Sorry, there's nothing here!</h1>
            <p>redirecting to home page, please wait.......</p>
        </div>
    </div>)
}

export default NoMatch;