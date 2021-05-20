import React from 'react';
import './style.scss';
import streetSign from '../../images/streetSign.png'
import Nav from '../../components/Nav';
import QuickBook from '../../components/QuickBook';
import InfoSection from '../../components/InfoSection';
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
                    <img src={streetSign} alt="" />
                    <span onClick={renderSignupModal} className='hostCTA'>Become a Host!</span>
                </div>
            </div>
            <QuickBook />
        </section>
        <section>
            <InfoSection />
        </section>
        <section>
            {/* <MyMapComponent findMeBtn={true} searchBar={true} /> */}
            <Footer />
        </section>
    </>)
}

export default Home;