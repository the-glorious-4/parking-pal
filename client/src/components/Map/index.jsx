import React, { useState, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { features } from '../../utils/dummyData.json';
import './style.scss';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import prkingLogo from './images/mapPic.png'

const containerStyle = {
    width: '80vw',
    height: '70vh'
};
const center = { lat: 37.774, lng: -122.419 }
const libraries = ['places'];
const options = {
    disableDefaultUI: true,
    zoomControl: true
}
const plots = features.map(location => (location.geometry.coordinates))

function MyMapComponent() {
    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries
    })


    const [markers, setMarkers] = useState(plots)
    const [map, setMap] = useState(null)
    const [selected, setSelected] = useState(null)
    const mapRef = useRef();

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        setMap(mapRef)
    });

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(16);
        // mapRef.current.setZoom(17);
        setMap(mapRef)

    }, [])

    function getPosition() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, console.log)
        });
    }

    const FindMeBtn = ({ panTo }) => {
        return <button
            className='findMeBtn'
            onClick={async () => {
                console.log('looking for you...');
                let position = await getPosition();
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }}><span>Find Me</span></button>
    }

    const Search = () => {
        const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
            requestOptions: {
                location: { lat: () => 37.774, lng: () => -122.419 },
                radius: 10000
            }
        })

        return <div className='searchBox'>
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();

                try {
                    const results = await getGeocode({ address })
                    const { lat, lng } = await getLatLng(results[0])
                    panTo({ lat, lng });
                } catch (error) {
                    console.log('error!', error)
                }

            }}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    disabled={!ready}
                    placeholder="Enter location here"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>

            </Combobox>
        </div>
    }


    if (loadError) {
        return "something went wrong"
    }
    if (!isLoaded) {
        return "loading"
    }

    return (
        <div className='mapBody'>
            <h1 className='mapTitle'>Parking-Pal <span role='img'>🚗</span></h1>
            <FindMeBtn panTo={panTo} />
            <Search />
            <GoogleMap
                key={new Date().getTime()}
                mapContainerStyle={containerStyle}
                zoom={15}
                center={center}
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
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
        </div>
    )
}

export default React.memo(MyMapComponent)