import React, { useState, useRef, useCallback } from 'react'
import {
    GoogleMap,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { features } from '../../utils/dummyData.json';
import './style.scss';
import Search from '../SearchInput'
import FindMeBtn from '../FindMeBtn'
import prkingLogo from './images/mapPic.png'
import { useStoreContext } from '../../utils/GlobalState';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_PARKING } from "../../utils/queries";
import { getGeocode, getLatLng } from 'use-places-autocomplete';


const containerStyle = {
    width: '80vw',
    height: '70vh'
};
const options = {
    disableDefaultUI: true,
    zoomControl: true
}

const plots = features.map(location => (location.geometry.coordinates))

function MyMapComponent(props) {


    const [state,] = useStoreContext();
    const [markers,] = useState(plots)
    const [, setMap] = useState(null)
    const [selected, setSelected] = useState(null)
    const mapRef = useRef();

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        setMap(mapRef)
    });

    const parkingRedirect = () => {
        console.log(features.filter(marker => marker.geometry.coordinates === selected));
    }

       let date = "2021-05-18"
        const { loading, data } = useQuery(QUERY_ALL_PARKING,
            { variables: { city: "san francisco", startDate: date } },
        );
        console.log(data.getAllParking);

    // if (data) {
    //     let { apt, street, city, state, zip } = data.getAllParking[0].parkingPlace;

    //     let addressToGet = apt + ' ' + street + ', ' + city + ', ' + state + ', ' + zip;

    //     getGeocode({address: addressToGet})
    //     .then((results) => getLatLng(results[0]))
    //     .then(({lat, lng}) => {
    //         console.log(lat,lng);
    //     })
    //     .catch(err => console.log(err))
    // }

    return (
        <div className='mapBody'>
            <h1 className='mapTitle'>Parking-Pal <span role='img'>🚗</span></h1>

            {props.findMeBtn ? <div className='findMeBtn'><FindMeBtn /></div> : null}

            {props.searchBar ? <div className='searchBoxMap'>
                <Search />
            </div> : null}
            
            <GoogleMap
                key={new Date().getTime()}
                mapContainerStyle={containerStyle}
                zoom={15}
                center={state.mapLocation ? state.mapLocation : { lat: 37.774, lng: -122.419 }}
                options={options}
                onLoad={onLoad}
            >
                {markers.map(marker => <Marker
                    icon={{
                        url: prkingLogo,
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20)
                    }}
                    key={markers.indexOf(marker)}
                    onClick={() => { setSelected(marker) }}
                    position={{ lat: marker[1], lng: marker[0] }}
                    id={markers.indexOf(marker)}
                />)}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected[1], lng: selected[0] }}
                        onCloseClick={() => { setSelected(null) }}
                    >

                        {/* THIS IS THE MAP BUBBLE FILLER */}
                        <div>
                            <h3 style={{ textAlign: 'center' }}>Parking</h3>
                            <p>This is a pretty great spot</p>
                            <button onClick={parkingRedirect}>check it out</button>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
        </div>
    )
}

export default React.memo(MyMapComponent)