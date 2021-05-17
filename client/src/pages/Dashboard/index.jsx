import React from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";
import Nav from '../../components/Nav';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_USER);
    let user;
    
    user = data?.user || {};

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!Auth.loggedIn) {
        return <h1>Returning to Homepage...</h1>;
    }

    return (
        <>
            <Nav />
            <div className="dashboard">
                <h1>Welcome, {user.firstName}!</h1>
                <div className="active-lists">
                    <div className="dash-list">
                        <h2>Current and Upcoming Reservations</h2>
                        <ul>
                            {/* TODO: query all reservations that list this user as a consumer */}
                        </ul>
                        <button>Reserve a Parking Space</button>
                    </div>
                    <div className="dash-list">
                        <h2>Your Spaces</h2>
                        {
                            // if user is a provider, display parking spaces they own
                            user.parkingPlace ?
                            <ul>
                                {user.parkingPlace.map(({ _id, street, city, state, zip }) => (
                                    <li key={_id}>
                                        {/* TODO: Link to detail view. Endpoint: `/${space._id}` */}
                                        {`${street} ${city}, ${state} ${zip}`}
                                    </li>
                                ))}
                            </ul>
                            :
                            <span>You are currently not a Parking Space Provider.</span>
                        }
                        <button>Add a new Parking Space</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
