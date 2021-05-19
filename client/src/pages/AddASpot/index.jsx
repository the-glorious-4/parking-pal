import React, { useState } from "react";
import "./style.scss";
// import { useMutation } from "@apollo/react-hooks";
// import { ADD_PARKINGPLACE } from "../../utils/mutations";
import Nav from '../../components/Nav';

const AddASpot = () => {
  
  const [formState, setFormState] = useState({
    apt: "", street: "", city: "", state: "", zip: "", isCoveredParking: false, capacity: 0,
  });

  // const [errFlags, setErrFlags] = useState({ addrError: false});

  // const [addParkingPlace, { error }] = useMutation(ADD_PARKINGPLACE);

  // validate form and set error messages.
  const validateForm = () => {
    return true;
    // if geolocation fails on this address, turn on error message
  };

  const handleChange = event => {
    // destructure event target
    const { type, name, value } = event.target;
    // if (event.target.type === "checkbox") console.log(event.target.checked, event.target.value);
    // update state
    setFormState({ ...formState, [name]: (type) ? event.target.checked : value });
  };
  
  const handleFormSubmit = async event => {
    event.preventDefault();
    if (!validateForm()) return false;
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
              <label htmlFor="apt">Apartment #</label>
              <input
                placeholder="Apartment #"
                name="apt"
                type="apt"
                id="apt"
                onChange={handleChange}
              />
          </div>
          <div className="field">
            <label htmlFor="street">Street Address</label>
            <input
              placeholder="Street Address"
              name="street"
              type="street"
              id="street"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="city">city</label>
            <input
              placeholder="City"
              name="city"
              type="city"
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <input
              placeholder="State"
              name="state"
              type="state"
              id="state"
              onChange={handleChange}
            />
          </div>
          {/* <select class="form-select" id="state" name="state" required>
                          <option selected disabled value="">Choose...</option>
                          {{>states}}
                      </select> */}
    
          <div className="field">
            <label htmlFor="zip">ZipCode</label>
            <input
              placeholder="zipcode"
              name="zip"
              type="zip"
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
            <label htmlFor="capacity">capacity</label>
            <input
              placeholder="capacity"
              name="capacity"
              type="capacity"
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
