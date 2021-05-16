import React from 'react';
import './style.scss';

import Nav from '../../components/Nav';
import QuickBook from '../../components/QuickBook';
import InfoSection from '../../components/InfoSection';
import MyMapComponent from '../../components/Map';

const Home = () => {
    return (<>
        <Nav />
        <section className='heroSection'>
            <div className='heroImg'></div>
            <QuickBook />
        </section>
        <section>
            <InfoSection />
        </section>
        <section>
            <MyMapComponent
                // isMarkerShown
                // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                //                                                         // &key=${process.env.REACT_APP_GOOGLE_API}
                // loadingElement={<div className='mapBody' />}
                // containerElement={<div className='mapBody' />}
                // mapElement={<div className='mapBody' />}
            />
        </section>
    </>)
}

export default Home;