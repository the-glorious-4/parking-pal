import React, { useState } from "react";
import "./style.scss";
import { useMutation } from "@apollo/react-hooks";
import { todaysDate } from "../../utils/helpers";
import { ADD_INVENTORY } from "../../utils/mutations";

const NewInventory = ({ _id }) => {
    const [formState, setFormState] = useState({ date: "", price: 1 });

    const handleChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ ...formState, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formState);
    }

    return (<>
        <h2>Add a New Availability</h2>
        <form className="add-inventory-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="date">Date</label>
                <input
                    name="date"
                    id="date"
                    type="date"
                    min={todaysDate()}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="price">Price $</label>
                <input
                    placeholder="1.00"
                    name="price"
                    id="price"
                    type="number"
                    min="0.00"
                    defaultValue="1.00"
                    step="0.01"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add New Availability</button>
        </form>
    </>);
};

export default NewInventory;
