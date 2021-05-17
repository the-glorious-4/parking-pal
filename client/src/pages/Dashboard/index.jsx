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

    return (
        <>
            {Auth.loggedIn() ? (
                <>
                    <Nav />
                    <div className="dashboard">
                        <h1>Welcome, {user.firstName}!</h1>
                        <div className="active-lists">
                            <div className="dash-list">
                                <h2>Current and Upcoming Reservations</h2>
                                <ul>
                                </ul>
                            </div>
                            <div className="dash-list">
                                <h2>Your Spaces</h2>
                                <ul>
                                    {user.parkingPlace.map(({ _id, street, city, state, zip }) => (
                                        <li key={_id}>
                                            {/* TODO: Link to detail view */}
                                            {`${street} ${city}, ${state} ${zip}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h2>Returning to Homepage...</h2>
                // automatic redirect in App.js's router
            )}
        </>
    );
};

export default Dashboard;
