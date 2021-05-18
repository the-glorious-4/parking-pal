import React from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";
import Nav from '../../components/Nav';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_USER);
    /* TODO: query all reservations that list this user as a consumer */
    let user, reservations;
    
    user = data?.user || {};
    /* TODO: populate reservations with real data */
    reservations = [{ _id: "007", street: "111 testdrive lane", city: "San Antonio", state: "CA", zip: "65432", startDate: "May 04, 2021" }];

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!Auth.loggedIn) {
        return <h1>Returning to Homepage...</h1>;
    }

    console.log(user);

    return (
        <div className="dashboard-content-container">
            <Nav />
            {user ?
            <div className="dashboard">
                <h1>Welcome, {user.firstName}!</h1>
                <div className="active-lists">
                    <div className="dash-list">
                        <h2>Current and Upcoming Reservations</h2>
                        {
                            // if user has any active reservations, display them
                            // NOTE: reservation query likely to be: filter mongo document by userid and isactive
                            reservations ?
                            <ul>
                                {reservations.map(({ _id, street, city, state, zip, startDate }) => (
                                    <li key={_id}>
                                        <span className="dateheader">{startDate}</span>
                                        {`${street} ${city}, ${state} ${zip}`}
                                    </li>
                                ))}
                            </ul>
                            :
                            <span className="dashboard-nolist">
                                You currently have no active reservations.
                            </span>
                        }
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
                            <span className="dashboard-nolist">
                                You are currently not a Parking Space Provider.
                            </span>
                        }
                        <button>Add a new Parking Space</button>
                    </div>
                </div>
            </div>
            :
            <h1 className="page-error">Something went wrong!</h1>}
        </div>
    );
};

export default Dashboard;
