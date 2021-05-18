import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PARKINGPLACE } from "../../utils/mutations";

import "./style.scss";

const addParkingPlacePage = () => {
  
  const [ppformState, setFormState] = useState({
    apt: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    isCoveredParking: false,
    capacity: 0,
  });

  const [errFlags, setErrFlags] = useState({ passLengthError: false});

  const [addParkingPlace, { error }] = useMutation(ADD_PARKINGPLACE);

  // validate form and set error messages.
  const validateForm = fieldName => {
          setErrFlags({
              ...errFlags,
              passLengthError: (fieldName.length > 0) ? false : true
          });
  };
  
  // on blur, validate fields
  const handleBlur = event => {
    validateForm(event.target.name);
  };
  const handleChange = (event) => {
    // destructure event target
    const { name, value } = event.target;
    // update state
    setFormState({ ...ppformState, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addParkingPlace({
        variables: {
          ...ppformState,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form className="addParkingPlaceForm" onSubmit={handleFormSubmit}>
        <div class="col-md-8">
          <div className="field">
            <label htmlFor="apt">Apartment #</label>
            <input
              placeholder="Apartment #"
              name="apt"
              type="apt"
              id="apt"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div class="invalid-feedback">
            Please provide a valid aparment number.
          </div>
        </div>
        <div className="field">
          <label htmlFor="street">Street Address</label>
          <input
            placeholder="Street Address"
            name="street"
            type="street"
            id="street"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div class="invalid-feedback">
          Please provide a valid street address.
        </div>
        <div className="field">
          <label htmlFor="city">city</label>
          <input
            placeholder="City"
            name="city"
            type="city"
            id="city"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div class="invalid-feedback">Please provide a valid city.</div>

        <div className="field">
          <label htmlFor="state">State</label>
          <input
            placeholder="State"
            name="state"
            type="state"
            id="state"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {/* <select class="form-select" id="state" name="state" required>
                        <option selected disabled value="">Choose...</option>
                        {{>states}}
                    </select> */}
        <div class="invalid-feedback">Please select a valid state.</div>

        <div className="field">
          <label htmlFor="zip">ZipCode</label>
          <input
            placeholder="zipcode"
            name="zip"
            type="zip"
            id="zip"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="field">
          <label htmlFor="isCoveredParking">is Covered Parking</label>
          <input
            placeholder="isCoveredParking"
            name="isCoveredParking"
            type="checkbox"
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
        </div>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {<div>Something went wrong...</div>}
    </div>
  );
}

export default addParkingPlacePage;
