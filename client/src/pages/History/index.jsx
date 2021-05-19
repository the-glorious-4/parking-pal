import React from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { QUERY_USER, INVENTORY_HISTORY } from "../../utils/queries";
import Nav from '../../components/Nav';

const History = () => {
    const userQuery = useQuery(QUERY_USER);
    const inventoryQuery = useQuery(INVENTORY_HISTORY);
    let user, inventory;
    
    user = userQuery.data?.user || {};
    inventory = inventoryQuery.data?.getAllInventoriesByProviderID || {};

    if (userQuery.loading || !user) {
        return <h1>Loading...</h1>;
    }
    if (!Auth.loggedIn()) {
        return <h1>Returning to Homepage...</h1>;
    }

    console.log("loading", inventoryQuery.loading, "inventory: ", inventory);

    return (
        <div className="history-bg content-container">
            <Nav />
            {user?
            <div className="history">
                <div className="history-heading">
                    <h1>History for {user.firstName} {user.lastName}</h1>
                    {/* Filters */}
                </div>
                {/* History Section */}
                <div className="history-list">
                    {inventoryQuery.loading /*|| reservationQuery.loading */ ?
                    <h1>Loading data...</h1>
                    :
                    <ul>
                        {inventory.map(({ _id, parkingPlace: p, startDate, price }) => (
                            <li key={_id}>
                                Inventory:<br />
                                Address: {`${p.street} ${p.city}, ${p.state} ${p.zip}`}<br />
                                Date: {startDate}<br />
                                Price: {`$${price}`}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
            :
            <h1 className="page-error">Something went wrong!</h1>}
        </div>
    );
};

export default History;
