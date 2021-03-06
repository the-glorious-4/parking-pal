import React from 'react';

import './style.scss';

import newYork from '../../images/newYork.jpeg';
import austin from '../../images/austin.jpeg';
import losAngeles from '../../images/losAngeles.jpeg';
import sanFrancisco from '../../images/sanFrancisco.jpeg';
import portland from '../../images/portland.jpeg';

const NowServing = () => {
    return (<>
        <div className='nowBody'>
            <h1 className='nowServing'>Now Servicing:</h1>

            <div className='nowCity'>
                <h1>New York</h1>
                <img src={newYork} alt="" />
            </div>

            <div className='nowCity'>
                <h1>Austin</h1>
                <img src={austin} alt="" />
            </div>

            <div className='nowCity'>
                <h1>Los Angeles</h1>
                <img src={losAngeles} alt="" />
            </div>

            <div className='nowCity'>
                <h1>San Francisco</h1>
                <img src={sanFrancisco} alt="" />
            </div>

            <div className='nowCity'>
                <h1>Portland</h1>
                <img src={portland} alt="" />
            </div>
        </div>
    </>)
}

export default NowServing