import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { features } from '../../utils/dummyData.json';
import './style.scss';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    let plots = features.map(location => (location.geometry.coordinates))
    return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}>

                {/* This maps over the data to create plotpoints on the map */}
                {props.isMarkerShown && <>
                    {plots.map(longLat => <Marker position={{ lat: longLat[1], lng: longLat[0] }} />)}

                </>}
            </GoogleMap>
    )
}))

export default MyMapComponent;