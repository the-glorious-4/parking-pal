
const getLocation = () => {
    const logCoords = (position) => {
        console.log('func 1');
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
      }
    let defaultLocation = () => {
        console.log('func 2');
        return { lat: 37.7749, lng: -122.4194 }
    }

    if(navigator.geolocation){
        return navigator.geolocation.getCurrentPosition(logCoords, defaultLocation)
    } else {
        return console.log('i dont know what im doing');
    }
}
// (getLocation());


// const showError = (error) => {
//     console.log(error);
//     switch(error.code) {
//       case error.PERMISSION_DENIED:
//         console.log("User denied the request for 1Geolocation.");
//         break;
//       case error.POSITION_UNAVAILABLE:
//         console.log("User denied the request for 2Geolocation.");
//         break;
//       case error.TIMEOUT:
//         console.log("User denied the request for 3Geolocation.");
//         break;
//       case error.UNKNOWN_ERROR:
//         console.log("User denied the request for 4Geolocation.");
//         break;
//     }
//   }

export default getLocation;