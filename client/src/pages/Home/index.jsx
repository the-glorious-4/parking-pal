import React from 'react';
import './style.scss';

import banner from '../../images/banner.png';

import Nav from '../../components/Nav';
import QuickBook from '../../components/QuickBook';
import InfoSection from '../../components/InfoSection';
import NowServing from '../../components/NowServing';
import Footer from '../../components/Footer';

import { RENDER_SIGNUP_MODAL } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const Home = () => {

    const [, dispatch] = useStoreContext();

    const renderSignupModal = () => {
        dispatch({ type: RENDER_SIGNUP_MODAL });
    };

    return (<>

        <Nav />
        <section className='heroSection'>
            <div className='heroImg'>
                <div className='heroHeading'>
                    <h2>Parking</h2>
                    <h2>Made</h2>
                    <h2>Easy</h2>
                    <p>Safe. Simple. Reliable.</p>
                </div>
                <div className='hostSignDiv'>
                    <img src={banner} alt="" />
                    <span onClick={renderSignupModal} className='hostCTA'>List Your Spot Free!</span>
                </div>
            </div>
            <QuickBook />
        </section>
        <section id='infoSection'>
            <InfoSection />
        </section>
        <section id='aboutUs'>
            <NowServing />
            <Footer />
        </section>
    </>)
}

export default Home;