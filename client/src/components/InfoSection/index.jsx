import React from 'react';
import './style.scss'
import './main'
import parkingPal from '../../images/parkingPal.png';
import handIphone from '../../images/handIphone.png';


const InfoSection = () => {

    return (<>
        {/* <div id='infoSection' className='infoSection'>
            <div className='infoBody'>
                <div className='info1'>
                    <h2>Find a spot</h2>
                </div>
                <div className='info2'>
                    <h2>Reserve a spot</h2>
                </div>
                <div className='info3'>
                    <h2>Stop Stressing!</h2>
                </div>
            </div>
        </div> */}
        <div className='cardBody'>
        <div className="flip-card projectCrd flipOne">
            <div className="flip-card-inner">
                <div className="flip-card-front info1">
                    <h2>Rent A Spot!</h2>
                </div>
                <div className="flip-card-back">
                    <p>Easily find and rent parking spaces all over town! Indoor or outdoor, there's a parking space for everyone!</p>
                </div>
            </div>
        </div>
        <div className="flip-card projectCrd">
            <div className="flip-card-inner">
                <div className="flip-card-front info2">
                <h2>Offer Your Spot!</h2>
                </div>
                <div className="flip-card-back">
                    <p>Make easy passive income by listing you parking with us and offering it to locals who need a place to park!</p>
                </div>
            </div>
        </div>
        <div className="flip-card projectCrd">
            <div className="flip-card-inner">
                <div className="flip-card-front info3">
                <h2>Stop Stressing!</h2>
                </div>
                <div className="flip-card-back">
                    <p>No more stress! Parking-Pals is here to make life easy! Eventually there might be <span>HUNDREDS OF THOUSANDS OF DAILY USERS!</span></p>
                </div>
            </div>
        </div>
        </div>


        <div className='iphoneDiv'>
        <img className='appPic' src={parkingPal} alt=""/>
        <img className='iphone' src={handIphone} alt=""/>
        </div>
    </>
    )
}

export default InfoSection;