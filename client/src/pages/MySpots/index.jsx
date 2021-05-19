import React, { useState } from "react";
import "./style.scss";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import Auth from "../../utils/auth";
import { QUERY_USER,  } from "../../utils/queries";
import { ADD_INVENTORY } from "../../utils/mutations";

const MySpots = () => {
    const { loading, data } = useQuery(QUERY_USER);
    let spaces;

    spaces = data?.user.parkingPlace || {};

    if (loading) return <h1>Loading...</h1>;
    if (!Auth.loggedIn) return <h1>Returning to Homepage...</h1>;

    function renderInfo(event) {
        event.preventDefault();
        console.log(event.target);
    }

    console.log(spaces);


    return (<>
        <div className="my-parking-bg content-container">
            <Nav />
            <div className="my-parking">
                <h1>My Spaces</h1>
                <div className="inventory-main">
                    {/* Parking Space List */}
                    <div className="spaces-container">
                        <p>Select a space to view and edit its availability information.</p>
                        {spaces ?
                        <ul className="space-list">
                            {spaces.map(({ _id, street, apt, city, state, zip }) => (
                                <li key={_id} data-id={_id} onClick={renderInfo}>
                                    {`${street} ${apt} ${city}, ${state} ${zip}`}
                                </li>
                            ))}
                        </ul>
                        :
                        <span className="dashboard-nolist">
                                You are currently not a Parking Space Provider.
                        </span>}
                        <Link to="/addparking"><button>Add a new Parking Space</button></Link>
                    </div>
                    {/* Scheduling calendar */}
                    <div className="inventory-container">
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default MySpots;
