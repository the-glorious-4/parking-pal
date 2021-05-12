import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {features} from '../../utils/dummyData.json';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
let plots = features.map(location => (location.geometry.coordinates))
return ( 
    <div className='mapBody'>
<GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
  >
    {props.isMarkerShown && <>
    {plots.map(longLat => <Marker position={{ lat: longLat[1], lng: longLat[0] }} /> )}
    </>}
  </GoogleMap>
  </div>
)
}))

export default MyMapComponent;