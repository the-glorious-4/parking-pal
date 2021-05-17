import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
    // mapRef.current.setZoom(17);
    setMap(mapRef)
}, [])

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

export default Search;