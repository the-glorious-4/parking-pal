import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MAP_LOCATION } from '../../utils/actions';

function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, console.log)
    });
}
const FindMeBtn = () => {

    const [, dispatch] = useStoreContext();
    
    return <button
        className=''
        onClick={async () => {
            console.log('looking for you...');
            let position = await getPosition();
            dispatch({
                type: UPDATE_MAP_LOCATION,
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }}><span>Find Me</span></button>
}

export default FindMeBtn;