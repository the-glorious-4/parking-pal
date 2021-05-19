import React from 'react';
import Nav from '../../components/Nav';
// import noParking from '../../images/NoParking.png';
import bang from './gifs/bang.gif';
import bounce from './gifs/bounce.gif';
import crash from './gifs/crash.gif';
import ouch from './gifs/ouch.gif';
import whoops from './gifs/whoops.gif';

import './style.scss';

const NoMatch = () => {
    window.setTimeout(function () {
        window.location = "/";
    }, 8000);

    let imgPicker = Math.floor(Math.random() * 5 + 1);

    return ( <>
        <Nav />
        <div className='sorryBody'>
        {{
            '1': <img src={bounce} alt="bounce" />,
            '2': <img src={bang} alt="bang" />,
            '3': <img src={crash} alt="crash" />,
            '4': <img src={ouch} alt="ouch" />,
            '5': <img src={whoops} alt="whoops" />
        }[imgPicker]}

        <div>
            <h1>Sorry, there's nothing here!</h1>
            <p>redirecting to home page, please wait.......</p>
        </div>
    </div>
    </>)
}

export default NoMatch;