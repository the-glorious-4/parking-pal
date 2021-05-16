import React from "react";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../utils/queries";
import Nav from '../../components/Nav';

const Dashboard = () => {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
            {user ? (
                <>
                    <Nav />
                    <div className="dashboard">
                        <h2>Welcome, {user.firstName}.</h2>
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
