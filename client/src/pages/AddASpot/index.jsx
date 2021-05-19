import React, { useState } from "react";
import "./style.scss";
// import { useMutation } from "@apollo/react-hooks";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Nav from '../../components/Nav';
// import { ADD_PARKINGPLACE } from "../../utils/mutations";

const AddASpot = () => {
  
  const [formState, setFormState] = useState({
    apt: "", street: "", city: "", state: "", zip: "", isCoveredParking: false, capacity: 1
  });

  // const [errFlags, setErrFlags] = useState({ addrError: false});

  // const [addParkingPlace, { error }] = useMutation(ADD_PARKINGPLACE);

  // validate form and set error messages.
  const validateForm = () => {
    // if any fields were left blank, set errFlag
    return true;
    // if geolocation fails on this address, turn on error message
  };

  const handleChange = event => {
    // destructure event target
    const { type, name, value } = event.target;
    console.log(value);
    // if (event.target.type === "checkbox") console.log(event.target.checked, event.target.value);
    // update state
    setFormState({ ...formState, [name]: (type === "checkbox") ? event.target.checked : value });
  };
  
  const handleFormSubmit = async event => {
    event.preventDefault();
    if (!validateForm()) return false;
    
    const address = `${formState.street}, ${formState.city}, ${formState.state}, ${formState.zip}`;

    try {
      // get latitude and longitude from full address
      const geocode = await getGeocode({address});
      const latLng = await getLatLng(geocode[0]);
      console.log(latLng);

      // if everything is in place, add new ParkingPlace to database
      // TODO
    }
    // on error: set form message
    catch (e) {
      console.log(e);
    }
    // try {
    //   await addParkingPlace({
    //     variables: {
    //       ...formState,
    //     },
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <div className="content-container">
      <Nav />
      <div className="add-parking">
        <h1>Host a New Parking Spot</h1>
        <form className="addParkingForm" onSubmit={handleFormSubmit}>
          <div className="field">
            <label htmlFor="street">Street Address <span className="required-field">*</span></label>
            <input
              placeholder="Street Address"
              name="street"
              id="street"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="apt">Apartment #</label>
            <input
              placeholder="Apartment #"
              name="apt"
              id="apt"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="city">City <span className="required-field">*</span></label>
            <input
              placeholder="City"
              name="city"
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="state">State <span className="required-field">*</span></label>
            <input
              placeholder="State"
              name="state"
              id="state"
              onChange={handleChange}
            />
          </div>
          {/* <select class="form-select" id="state" name="state" required>
                          <option selected disabled value="">Choose...</option>
                          {{>states}}
                      </select> */}
    
          <div className="field">
            <label htmlFor="zip">Zip Code <span className="required-field">*</span></label>
            <input
              placeholder="zipcode"
              name="zip"
              id="zip"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="isCoveredParking">Is This Parking Space Covered?</label>
            <input
              placeholder="isCoveredParking"
              name="isCoveredParking"
              type="checkbox"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="capacity">Parking Space Capacity <span className="required-field">*</span></label>
            <input
              type="number"
              placeholder="1"
              defaultValue="1"
              name="capacity"
              id="capacity"
              onChange={handleChange}
            />
          </div>

          <button className="btn col-12 col-md-3" type="submit">
            Submit
          </button>
        </form>
      </div>

      {/* {<div>Something went wrong...</div>} */}
    </div>
  );
}

export default AddASpot;
