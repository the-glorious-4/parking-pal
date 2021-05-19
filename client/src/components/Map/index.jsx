import React, { useState, useEffect } from 'react'
import {
    GoogleMap,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { getAllParking } from '../../utils/dummyData.json';
import './style.scss';
import Search from '../SearchInput'
import FindMeBtn from '../FindMeBtn'
import prkingLogo from './images/mapPic.png'
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_LOCATION, UPDATE_SELECTED_INVENTORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_PARKING } from "../../utils/queries";
import { Link, Redirect } from "react-router-dom";
// import { getGeocode, getLatLng } from 'use-places-autocomplete';


const containerStyle = {
    width: '80vw',
    height: '70vh'
};
const options = {
    disableDefaultUI: true,
    zoomControl: true
}

const plots = getAllParking.map(location => (location))

function MyMapComponent(props) {


    const [state, dispatch] = useStoreContext();
    const [markers, setMarkers] = useState(plots)
    const [, setMap] = useState(null)
    const [selected, setSelected] = useState(null)

    // const mapRef = useRef();

    // const onLoad = (map) => {
    //     mapRef.current = map;
    //     setMap(mapRef)
    // };

    // const parkingRedirect = () => {
    //     console.log(markers.filter(marker => marker.parkingPlace.latLng === selected));
    // }

    const { loading, data } = useQuery(QUERY_ALL_PARKING,
        { variables: { city: state.mapCity, startDate: state.mapDate } },
    );
    if (loading) {
        console.log('loading');
    }

    console.log(state.selectedInventory);

    useEffect(() => {
        if (data) {
            console.log(data.getAllInventories);
            setMarkers(data.getAllInventories);
        }
    }, [data])

    // console.log(markers);

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
            // onLoad={onLoad}
            >
                {markers &&
                    (markers.map(marker => <Marker

                        icon={{
                            url: prkingLogo,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20)
                        }}
                        key={markers.indexOf(marker)}
                        onClick={() => {
                            dispatch({
                                type: UPDATE_SELECTED_INVENTORY,
                                selectedInventory: marker
                            });
                            dispatch({
                                type: UPDATE_MAP_LOCATION,
                                location: { lat: parseFloat(marker.parkingPlace.latLng[0]), lng: parseFloat(marker.parkingPlace.latLng[1]) }
                            })
                        }}
                        position={{ lat: parseFloat(marker.parkingPlace.latLng[0]), lng: parseFloat(marker.parkingPlace.latLng[1]) }}
                        id={markers.indexOf(marker)}
                    // onLoad={console.log(marker, 'heres the marker')}
                    />))}

                {state.selectedInventory ? (
                    <InfoWindow
                        position={{ lat: parseFloat(state.selectedInventory.parkingPlace.latLng[0]), lng: parseFloat(state.selectedInventory.parkingPlace.latLng[1]) }}
                        onCloseClick={() => {
                            dispatch({
                                type: UPDATE_SELECTED_INVENTORY,
                                selectedInventory: null
                            });
                        }}
                    >
                        <div className='mapInfoWindow'>
                            <h3 style={{ textAlign: 'center' }}>${state.selectedInventory.price}/day</h3>
                            <p>{state.selectedInventory.parkingPlace.street}, {state.selectedInventory.parkingPlace.city}<br />
                                {state.selectedInventory.parkingPlace.isCoveredParking ? 'Indoor Parking' : 'Outdoor Parking'}</p>
                            <Link to='whereverYulduzWantsToGo'>
                                <button style={{ textAlign: 'center' }}>Reserve</button>
                            </Link>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
        </div>
    )
}

export default React.memo(MyMapComponent)