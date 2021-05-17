import React from 'react';
import './style.scss';
import streetSign from '../../images/streetSign.png'
import Nav from '../../components/Nav';
import QuickBook from '../../components/QuickBook';
import InfoSection from '../../components/InfoSection';
import MyMapComponent from '../../components/Map';

const Home = () => {
    return (<>
        <Nav />
        <section className='heroSection'>
            <div className='heroImg'>
                <div className='heroHeading'>
                    <h2>Parking</h2>
                    <h2>Made</h2>
                    <h2>Easy</h2>
                    {/* <p>Safe. Simple. Reliable.</p> */}
                </div>
                <div className='hostSignDiv'>
                <img src={streetSign} alt=""/>
                <span className='hostCTA'>Become a Host!</span>
                </div>
            </div>
            <QuickBook />
        </section>
        <section>
            <InfoSection />
        </section>
        <section>
            <MyMapComponent
            // isMarkerShown
            // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places &key=${process.env.REACT_APP_GOOGLE_API}`}
                                                                   
            // loadingElement={<div className='mapBody' />}
            // containerElement={<div className='mapBody' />}
            // mapElement={<div className='mapBody' />}
            />
        </section>
    </>)
}

export default Home;