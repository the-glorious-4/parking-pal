import React from 'react';
import './style.scss'

import Nav from '../../components/Nav'
import QuickBook from '../../components/QuickBook'
import InfoSection from '../../components/InfoSection'

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
        <h1>Section heading</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, architecto sunt. Error modi dolores, velit, reprehenderit maxime nesciunt numquam aut voluptate a aperiam molestiae vitae natus ipsum blanditiis accusantium fuga!</p>
    </section>
    </>)
}

export default Home;