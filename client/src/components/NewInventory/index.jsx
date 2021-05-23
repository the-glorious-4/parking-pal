import React, { useState } from "react";
import "./style.scss";
import { useMutation } from "@apollo/react-hooks";
import { todaysDate } from "../../utils/helpers";
import { QUERY_USER } from "../../utils/queries";
import { ADD_INVENTORY } from "../../utils/mutations";

const NewInventory = ({ parkingId, inventory, setInventory }) => {
    const [formState, setFormState] = useState({ date: "", price: 1 });
    const [addInventory, { error }] = useMutation(ADD_INVENTORY, {
        refetchQueries: [ { query: QUERY_USER } ]
    });

    const handleChange = event => {
        // destructure event target
        const { name, value } = event.target;
        // update state
        setFormState({ ...formState, [name]: value });
    }

    const handleSubmit = async event => {
        event.preventDefault();

        // console.log(parkingId, formState);

        try {
            const { data : { addInventory: newInv } } = await addInventory({
                variables: {
                    startDate: formState.date,
                    price: parseFloat(formState.price),
                    parkingPlace: parkingId
                }
            });
            // console.log(newInv.startDate)

            setInventory({
                ...inventory,
                invList: [...inventory.invList, {
                    _id: newInv._id,
                    startDate: newInv.startDate,
                    price: newInv.price,
                    isAvailable: newInv.isAvailable
                }]
            });
        }
        catch (e) {
            console.error(e);

            if (error) console.error(error);
        }
    };

    return (<>
        <h2>Add a New Availability</h2>
        <form className="add-inventory-form" onSubmit={handleSubmit}>
            <div className="field inv-field">
                <label htmlFor="date">Date</label>
                <input
                    name="date"
                    id="date"
                    type="date"
                    min={todaysDate()}
                    onChange={handleChange}
                />
            </div>
            <div className="field inv-field">
                <label htmlFor="price">Price </label>
                <input
                    placeholder="1.00"
                    name="price"
                    id="price"
                    type="number"
                    step="any"
                    min="1" // min="1.00"
                    defaultValue="1"
                    // step="0.01" // database typeDefs use Int for now
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add New Availability</button>
        </form>
    </>);
};

export default NewInventory;
