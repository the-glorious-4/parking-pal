import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_LOCATION } from '../../utils/actions';


const Search = () => {

    // const { isLoaded, loadError } = useLoadScript({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    //     libraries: ["places"]
    // })

    const [, dispatch] = useStoreContext();

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 37.774, lng: () => -122.419 },
            radius: 10000
        }
    })

    return <div className='searchBox'>
    <script async
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&libraries=places`}>
</script>
        <Combobox className='comboMain' onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
                const results = await getGeocode({ address })
                const { lat, lng } = await getLatLng(results[0])
                dispatch({
                        type: UPDATE_MAP_LOCATION,
                        location: { lat: lat, lng: lng }
                    })
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
            <ComboboxPopover className='comboOption'>
                <ComboboxList className=''>
                    {status === "OK" && data.map(({ id, description }) => (
                        <ComboboxOption className='' key={Math.random()} value={description} />
                    ))}
                </ComboboxList>
            </ComboboxPopover>

        </Combobox>
    </div>
}

export default Search;