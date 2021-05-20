import React, { useState } from "react";
import "./style.scss";
import { useMutation } from "@apollo/react-hooks";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Nav from '../../components/Nav';
import { ADD_PARKINGPLACE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const AddASpot = () => {
    Auth.loggedIn() === false && window.location.assign('/');

  const [formState, setFormState] = useState({
    apt: "", street: "", city: "", state: "", zip: "", isCoveredParking: false, capacity: 1
  });

  const [formErr, setFormErr] = useState("");

  const [addParkingPlace, { error }] = useMutation(ADD_PARKINGPLACE);

  // validate form and set null-input message
  const validateForm = () => {
    // if any fields were left blank, set formErr and return false
    if (!formState.street || !formState.city || !formState.state || !formState.zip) {
      setFormErr("You have left a required field blank!");
      return false;
    }
    setFormErr("");
    return true;
  };

  const handleChange = event => {
    // destructure event target
    const { type, name, value } = event.target;
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
      const {lat, lng} = await getLatLng(geocode[0]);
      // console.log(lat, lng);

      // if everything is in place, add new ParkingPlace to database
      const { data: addParkingResponse } = await addParkingPlace({
        variables: {
          ...formState,
          capacity: parseInt(formState.capacity),
          latLng: [lat.toString(), lng.toString()]
        }
      });

      // console.log(addParkingResponse);
      window.location.assign("/myspots");
    }
    // on error: set form message
    catch (e) {
      setFormErr("This is not a valid address.");
    }
  };

  return (
    <div className="add-parking-bg content-container">
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

          <div className="field">
            <label htmlFor="zip">Zip Code <span className="required-field">*</span></label>
            <input
              placeholder="#####"
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
              min="1"
              name="capacity"
              id="capacity"
              onChange={handleChange}
            />
          </div>

          <button className="btn col-12 col-md-3" type="submit">
            Submit
          </button>
          {(formErr) ? <div className="required-field add-space-err">{formErr}</div> : null}
        </form>
      </div>
    </div>
  );
};

export default AddASpot;
