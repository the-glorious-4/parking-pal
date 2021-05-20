import React from 'react';
import Nav from '../../components/Nav';
import Map from '../../components/Map';
import QuickBook from '../../components/QuickBook';
import './style.scss';

const FindASpot = () => {

    return (
        <div>
        <Nav />
        <QuickBook />
        <Map findMeBtn={false} searchBar={false} />
        </div>
    )
}

export default FindASpot;