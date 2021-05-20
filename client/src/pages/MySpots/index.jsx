import React, { useState } from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import NewInventory from "../../components/NewInventory";
import Auth from "../../utils/auth";
import { formatDate } from "../../utils/helpers";
import { QUERY_USER } from "../../utils/queries";

const MySpots = () => {
    const [inventory, setInventory] = useState({ display: false, spaceId: "", spaceName: "", invList: [] });
    const { loading, data } = useQuery(QUERY_USER);
    let spaces;

    spaces = data?.user.parkingPlace || {};

    if (loading) return <h1>Loading...</h1>;
    if (!Auth.loggedIn) return <h1>Returning to Homepage...</h1>;

    // render parking space inventory information
    function renderInfo(event) {
        event.preventDefault();

        // get id of selected parking space and find it in spaces array
        const targetId = event.target.getAttribute("data-id");
        const currentSpace = spaces.find(ele => ele._id === targetId);
        console.log(currentSpace);

        // set inventory state by info in spaces array
        setInventory({
            display: true,
            spaceId: targetId,
            spaceName: event.target.innerHTML,
            invList: [...currentSpace.inventory]
        });
        console.log(inventory.invList)
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
                        <p style={{ textAlign: "center", fontWeight: "bolder" }}>
                            Select a space to view and edit its availability information.
                        </p>
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
                    {inventory.display &&
                    <div className="inventory-container spaces-container">
                        <h2>
                            Availability Information for:
                            <span className="space-span"> {inventory.spaceName}</span>
                        </h2>
                        {inventory.invList.length ?
                        <ul className="availability-list">
                            {/* List inventory for this space */}
                            {inventory.invList.map(({ _id, startDate, price, isAvailable }) => (
                                <li key={_id} className={!isAvailable ? "unavailable": "available"}>
                                    Availability: {isAvailable ? "Open" : "Closed"}  ●  
                                    Date: {formatDate(startDate)}  ●  
                                    Price: ${price}
                                </li>
                            ))}
                        </ul>
                        :
                        <span className="dashboard-nolist">
                            You have not added any availabilities for this space.
                        </span>}
                        <NewInventory parkingId={inventory.spaceId} />
                    </div>}
                </div>
            </div>
        </div>
    </>);
};

export default MySpots;
